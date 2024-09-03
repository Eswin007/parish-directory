import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import MemberForm from "./components/MemberForm";
import Dropdown from "./components/Dropdown";
import { object, string, date, array } from "yup";

export const FAMILY_INITIAL = {
  hof: "",
  phone1: "",
  phone2: "",
  email: "",
  mother_parish: "",
  address: "",
  dob: "",
  blood: "",
  members: [],
  // members: [{
  //     name: "",
  //     relation: "",
  //     occupation: "",
  //     dob: "",
  //     dom: "",
  //     blood: "",
  //   },
  // ],
};

export const BLOOD_GROUP = ["A+", "A-", "B-", "O+", "O-", "AB+", "AB-", "B+"];

const App = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(FAMILY_INITIAL);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [errors, setErrors] = useState();
  const bloodGroup = BLOOD_GROUP;
  const fetchMembers = async () => {
    const membersList = await axios.get("http://localhost:8000/family");
    setMembers(membersList.data);
    setFilteredMembers(membersList.data);
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
    dom: date().nullable(),
    blood: string().required("Please select a blood group"),
    members: array().of(
      object().shape({
        name: string().required("Member Name is required"),
        relation: string().required("Relation is required"),
        occupation: string().required("Occupation is required"),
        dob: date().required("Date of birth is required"),
        dom: date().nullable(),
        blood: string().required("Please select the blood group"),
      })
    ),
  });

  const saveFamilyHandler = async (formvalues, memberID) => {
    console.log(formvalues);
    try {
      await validationSchema.validate(formvalues, { abortEarly: false });
      if (memberID) {
        await axios.put(`http://localhost:8000/family/${memberID}`, formvalues);
        await fetchMembers();
        setShowForm(false);
      } else {
        setFormData(FAMILY_INITIAL);
        console.log(formvalues, "form-values");
        await axios.post("http://localhost:8000/family", formvalues);
        await fetchMembers();
        setShowForm(false);
      }
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      console.log(formattedErrors, "error handling");
      setErrors(formattedErrors);
    }
  };

  const onDeleteFamily = (id) => {
    axios
      .delete(`http://localhost:8000/family/${id}`)
      .then((res) => fetchMembers())
      .catch((err) => console.log(err, "err"));
  };

  const onEditFamily = (id) => {
    setShowForm(true);
    const editMember = members.filter((member) => member.id === id);
    console.log(editMember);
    setFormData(...editMember);
  };

  return (
    <>
      <Header
        setShowForm={setShowForm}
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
            setShowForm={setShowForm}
            formData={formData}
            setFormData={setFormData}
            saveFamilyHandler={saveFamilyHandler}
            showForm={showForm}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {!showForm && filteredMembers?.length !== 0 ? (
          filteredMembers?.map((member) => (
            <Family
              key={member.id}
              id={member.id}
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
              membersList={formData?.members}
            />
          ))
        ) : (
          <div>No data to show</div>
        )}
      </div>
    </>
  );
};

export default App;
