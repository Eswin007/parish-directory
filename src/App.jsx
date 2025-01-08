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
  const [filteredMembers, setFilteredMembers] = useState([]);
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
    setFilteredMembers(familyList.data);
    setFamilyList(familyList.data)
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

  const saveFamilyHandler = async (formvalues, id) => {
    console.log(formvalues);
    const familyURL = `${supabaseURL}/rest/v1/family`;
    const familyMembersURL = `${supabaseURL}/rest/v1/familyMembers`;
    if (id) {
      await axios.put(
        `${familyURL}?family_id=eq.${id}`,
        `${familyMembersURL}?family_id=eq.${id}`,
        { ...formvalues },
        headerConfig
      );
    } else {
      await axios.post(familyURL, familyMembersURL, { ...formvalues }, headerConfig);
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
    const editMember = familyList.filter((member) => member.family_id === id);
    const editRelatives = familyMembersList.filter(relative => relative.family_id === id)

    console.log(editMember, "edit relatives");
  };
  return (
    <>
      <Header
        // setShowForm={setShowForm}
        formRevealHandler={formRevealHandler}
        showForm={showForm}
        setFormData={setFormData}
        fetchMembers={fetchMembers}
        setFilteredMembers={setFilteredMembers}
      />
      <div className="wrapper">
        {showForm && (
          <MemberForm
            // setShowForm={setShowForm}
            formData={formData}
            setFormData={setFormData}
            saveFamilyHandler={saveFamilyHandler}
            formRevealHandler={formRevealHandler}
            errors={errors}
            setErrors={setErrors}
            setFamilyMembersList={setFamilyMembersList}
            familyMembersList={familyMembersList}
          />
        )}
        {!showForm &&
          filteredMembers?.length > 0 &&
          filteredMembers?.map((member) => (
            <Family
              key={member.family_id}
              id={member.family_id}
              hof={member?.hof}
              email={member?.email}
              parish={member?.mother_parish}
              address={member?.address}
              phone1={member?.phone1}
              phone2={member?.phone2}
              members={member?.members}
              dob={member?.dob}
              dom={member?.dom}
              name={member?.hof}
              blood={member?.blood}
              occupation={member?.occupation}
              onDeleteFamily={onDeleteFamily}
              onEditFamily={onEditFamily}
              // membersList={formData?.members}
              familyList={familyList}
            />
          ))}
        {!showForm && filteredMembers.length === 0 && (
          <span>No data to show</span>
        )}
      </div>
    </>
  );
};

export default App;
