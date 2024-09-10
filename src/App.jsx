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
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
};

export const BLOOD_GROUP = ["A+", "A-", "B-", "O+", "O-", "AB+", "AB-", "B+"];

const App = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(FAMILY_INITIAL);
  const [relativesData, setRelativesData] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [errors, setErrors] = useState();
  const bloodGroup = BLOOD_GROUP;

  const fetchMembers = async () => {
    const familyURL = `${supabaseURL}/rest/v1/family`;
    const membersURL = `${supabaseURL}/rest/v1/familyMembers`;

    const familyList = await axios.get(familyURL, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const membersList = await axios.get(membersURL, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setFilteredMembers(familyList.data);
    setMemberList(membersList.data);
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
    const membersURL = `${supabaseURL}/rest/v1/familyMembers`;
    // try {
    // await validationSchema.validate(formvalues, { abortEarly: false });
    if (id) {
      await axios.put(
        `${familyURL}?family_id=eq.${id}`,
        { ...formvalues },
        headerConfig
      );
      console.log(formvalues, "formValues");
    } else {
      await axios.put(familyURL, { ...formvalues }, headerConfig);
      console.log(formvalues, "formValues");
    }

    // if (memberID) {
    //   await axios.put(
    //     `https://vffwbrvixbmlabmozktp.supabase.co/rest/v1/family/${memberID}`,
    //     formvalues
    //   );
    //   await fetchMembers();
    //   // setShowForm(false);
    //   formRevealHandler(false);
    // } else {
    //   console.log(formvalues, "form-values");
    //   debugger;
    //   await axios.post(
    //     familyURL,

    //     ...formvalues,

    //     {
    //       headers: {
    //         apikey: apiKey,
    //         Authorization: `Bearer ${apiKey}`,
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   // await axios.post(
    //   //   `https://api.jsonbin.io/v3/b/66db631fad19ca34f8a10701`,
    //   //   { id: new Date(), ...formvalues }
    //   // );
    await fetchMembers();
    //   // setShowForm(false);
    formRevealHandler(false);
    setFormData(FAMILY_INITIAL);
    // }
    // } catch (validationErrors) {
    //   console.log(validationErrors);
    //   const formattedErrors = {};
    //   validationErrors.inner.forEach((error) => {
    //     formattedErrors[error.path] = error.message;
    //   });
    //   console.log(formattedErrors, "error handling");
    //   setErrors(formattedErrors);
    //   console.log(errors, "new errors");
    // }
  };

  // const onDeleteFamily = (id) => {
  //   axios.delete(`http://localhost:8000/family/${id}`)
  //     .then((res) => fetchMembers())
  //     .catch((err) => console.log(err, "err"));
  // };
  const onDeleteFamily = (id) => {
    const familyURL = `${supabaseURL}/rest/v1/family`;
    // const membersURL = `${supabaseURL}/rest/v1/familyMembers`;
    axios
      .delete(`${familyURL}?family_id=eq.${id}`, headerConfig)
      .then((res) => fetchMembers());
  };

  const onEditFamily = (id) => {
    // setShowForm(true);
    formRevealHandler(true);

    const editMember = members.filter((member) => member.id === id);
    console.log(editMember);
    setFormData(...editMember);
  };
  console.log(relativesData, "relatives");
  return (
    <>
      <Header
        // setShowForm={setShowForm}
        formRevealHandler={formRevealHandler}
        showForm={showForm}
        setFormData={setFormData}
        members={members}
        setMembers={setMembers}
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
            setRelativesData={setRelativesData}
            relativesData={relativesData}
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
              memberList={memberList}
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
