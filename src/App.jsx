import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import MemberForm from "./components/MemberForm";
import Dropdown from "./components/Dropdown";
import { object, string, date, array } from "yup";
import config from "./config";

import Loader from "./components/Loader";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZndicnZpeGJtbGFibW96a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MjkxMzgsImV4cCI6MjA0MTMwNTEzOH0.yU8fXAZa_x84GwdVhPVDdLhOWbAa6r2PoHxhnV5ebn0";
const headerConfig = {
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
};

const supabaseURL = `https://vffwbrvixbmlabmozktp.supabase.co`;

export const FAMILY_INITIAL = {
  hof: "",
  phone1: "",
  phone2: "",
  email: "",
  mother_parish: "",
  address: "",
  dob: "",
  blood: "",
  occupation: "",
  members: [],
};

export const BLOOD_GROUP = ["A+", "A-", "B-", "O+", "O-", "AB+", "AB-", "B+"];
export const RELATION = [
  "Wife",
  "Son",
  "Daughter",
  "Grandson",
  "Granddaughter",
  "Daughter-In-Law",
];

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(FAMILY_INITIAL);
  const [familyList, setFamilyList] = useState([]);
  const [familyMembersList, setFamilyMembersList] = useState([]);
  const [filteredFamily, setFilteredFamily] = useState([]);
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [membersToBeRemoved, setMembersToBeRemoved] = useState([]);

  const fetchMembers = async () => {
    const familyURL = `${supabaseURL}/rest/v1/family`;
    const familyMembersURL = `${supabaseURL}/rest/v1/familyMembers`;

    const familyList = await axios.get(familyURL, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",

        "Content-Type": "application/json",
      },
    });
    const membersList = await axios.get(familyMembersURL, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setFilteredFamily(familyList.data);
    setFamilyList(familyList.data);
    setFamilyMembersList(membersList.data);
  };
  const formRevealHandler = (value) => {
    setShowForm(value);
    setErrors({});
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const validationSchema = object().shape({
    hof: string().required("Name is required"),
    phone1: string()
      .required("Phone 1 is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    phone2: string()
      .nullable()
      .matches(/^[0-9]*$/, "Must be only digits"),
    email: string()
      .email("Invalid email format")
      .required("Please Enter email"),
    mother_parish: string(),
    address: string().required("Address is required"),
    occupation: string(),
    dob: date()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required("Date of Birth is required"),
    dom: date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      ),
    blood: string().required("Please select a blood group"),
    members: array().of(
      object().shape({
        name: string().required("Member Name is required"),
        relation: string().required("Relation is required"),
        occupation: string().required("Occupation is required"),
        dob: date()
          .required("Date of birth is required")
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          ),
        dom: date()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          ),
        blood: string().required("Please select the blood group"),
      })
    ),
  });

  const saveFamilyHandler = async (formData) => {
    setIsLoading(true);
    console.log(formData, "eswinformdataonsave");
    const { members, ...familyHead } = formData;
    console.log(members, "eswinMembers");
    console.log(familyHead, "eswinfamilyhead");
    console.log(membersToBeRemoved, "toberemoved");

    const familyURL = `${supabaseURL}/rest/v1/family`;
    const familyMembersURL = `${supabaseURL}/rest/v1/familyMembers`;

    const postMembers = (members, familyID) => {
      const updatedMembers = members?.map((member) => {
        if (member?.membersID) {
          axios.put(
            `${familyMembersURL}?membersID=eq.${member?.membersID}`,
            member,
            headerConfig
          );
        } else if (member?.family_id) {
          axios.post(familyMembersURL, member, headerConfig);
        } else {
          axios.post(
            familyMembersURL,
            { ...member, family_id: familyID },
            headerConfig
          );
        }
      });
      return updatedMembers;
    };

    const removeMembersFromForm = (ids) => {
      if (ids?.length > 0) {
        const removeMembers = ids?.map((id) => {
          axios.delete(`${familyMembersURL}?membersID=eq.${id}`, headerConfig);
        });
        return removeMembers;
      }
    };

    let returnedFamilyID;

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      if (familyHead?.family_id) {
        await axios.put(
          `${familyURL}?family_id=eq.${familyHead?.family_id}`,
          familyHead,
          headerConfig
        );
      } else {
        await axios
          .post(familyURL, familyHead, headerConfig)
          .then((response) => (returnedFamilyID = response.data[0].family_id));
      }

      if (returnedFamilyID !== null) {
        await postMembers(members, returnedFamilyID);
      }

      if (membersToBeRemoved.length !== 0) {
        await removeMembersFromForm(membersToBeRemoved);
      }
      await fetchMembers();
      formRevealHandler(false);
      setFormData(FAMILY_INITIAL);
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach(
        (error) => (formErrors[error.path] = error.message)
      );
      setErrors(formErrors);

      console.log(formErrors, "fromSetErrors");
    }
    setMembersToBeRemoved([]);
    setIsLoading(false);
  };
  const onDeleteFamily = (id) => {
    const familyURL = `${supabaseURL}/rest/v1/family`;
    axios
      .delete(`${familyURL}?family_id=eq.${id}`, headerConfig)
      .then((res) => fetchMembers())
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onEditFamily = async (id) => {
    formRevealHandler(true);
    const editFamily = familyList?.find((family) => family.family_id === id);
    const editMember = familyMembersList?.filter(
      (members) => members?.family_id === id
    );

    setFormData({ ...editFamily, members: editMember });
  };
  return (
    <>
      <Header
        formRevealHandler={formRevealHandler}
        showForm={showForm}
        setFormData={setFormData}
        fetchMembers={fetchMembers}
        setFilteredFamily={setFilteredFamily}
        familyList={familyList}
        familyMembersList={familyMembersList}
      />
      <div className="wrapper">
        {isLoading && <Loader />}
        {showForm && (
          <MemberForm
            formData={formData}
            setFormData={setFormData}
            saveFamilyHandler={saveFamilyHandler}
            formRevealHandler={formRevealHandler}
            errors={errors}
            setErrors={setErrors}
            familyList={familyList}
            setFamilyMembersList={setFamilyMembersList}
            setMembersToBeRemoved={setMembersToBeRemoved}
          />
        )}
        {!showForm &&
          filteredFamily?.length > 0 &&
          filteredFamily?.map((family) => (
            <Family
              key={family?.family_id}
              family={family}
              familyMembers={familyMembersList.filter(
                (member) => member?.family_id === family?.family_id
              )}
              onDeleteFamily={onDeleteFamily}
              onEditFamily={onEditFamily}
            />
          ))}
        {!showForm && filteredFamily.length === 0 && (
          <span>No data to show</span>
        )}
      </div>
    </>
  );
};

export default App;
