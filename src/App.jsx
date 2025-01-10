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

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZndicnZpeGJtbGFibW96a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MjkxMzgsImV4cCI6MjA0MTMwNTEzOH0.yU8fXAZa_x84GwdVhPVDdLhOWbAa6r2PoHxhnV5ebn0";
const headerConfig = {
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
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
  relation: "",
  members: [],
};

export const BLOOD_GROUP = ["A+", "A-", "B-", "O+", "O-", "AB+", "AB-", "B+"];

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(FAMILY_INITIAL);
  const [familyList, setFamilyList] = useState([]);
  const [familyMembersList, setFamilyMembersList] = useState([]);
  const [filteredFamily, setFilteredFamily] = useState([]);
  const [errors, setErrors] = useState();
  const bloodGroup = BLOOD_GROUP;

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
    const {members, ...familyHead} = formData;
    console.log(members, 'eswinMembers');
    console.log(familyHead, 'eswinfamilyhead')
    
    const familyURL = `${supabaseURL}/rest/v1/family`;
    const familyMembersURL = `${supabaseURL}/rest/v1/familyMembers`;


    if (familyHead?.family_id) {
      await axios.put(
        `${familyURL}?family_id=eq.${familyHead?.family_id}`,
        { ...familyHead },
        headerConfig
      );
    } else {
      await axios.post(
        familyURL,
        { ...familyHead },
        headerConfig
      );
    }

    if(members?.family_id){
      await axios.put(
        `${familyMembersURL}?family_id=eq.${members?.membersID}`,
        {...members},
        headerConfig
      )
    } else {
      await axios.post(
        familyMembersURL,
        {...members},
        headerConfig
      )
    }

    await fetchMembers();
    formRevealHandler(false);
    setFormData(FAMILY_INITIAL);
  };
  const onDeleteFamily = (id) => {
    alert(id, "id");
    const familyURL = `${supabaseURL}/rest/v1/family`;
    axios
      .delete(`${familyURL}?family_id=eq.${id}`, headerConfig)
      .then((res) => fetchMembers())
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onEditFamily = (id) => {
    formRevealHandler(true);
    const editFamily = familyList?.find((family) => family.family_id === id);
    const editMember = familyMembersList?.filter(
      (members) => members.family_id === id
    );

    setFormData({ ...editFamily, members: editMember });
    console.log(editFamily, "formData");
  };
  return (
    <>
      <Header
        formRevealHandler={formRevealHandler}
        showForm={showForm}
        setFormData={setFormData}
        fetchMembers={fetchMembers}
        setFilteredFamily={setFilteredFamily}
      />
      <div className="wrapper">
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
