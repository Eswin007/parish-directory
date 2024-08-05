import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import MemberForm from "./components/MemberForm";
import { Helmet } from "react-helmet";

export const FAMILY_INITIAL = {
  hof: "",
  phone1: "",
  phone2: "",
  email: "",
  mother_parish: "",
  address: "",
  dob: "",
  blood: "",
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

const App = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(FAMILY_INITIAL);
  const [flag, setFlag] = useState(false);

  const fetchMembers = async () => {
    const membersList = await axios.get("http://localhost:8000/family");
    setMembers(membersList.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const saveFamilyHandler = async (formvalues, memberID) => {
    // console.log(memberID, "memberid");
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
    setFormData(...editMember);
  };

  return (
    <>
      <Header
        setShowForm={setShowForm}
        showForm={showForm}
        setFormData={setFormData}
      />
      <div className="wrapper">
        {showForm && (
          <MemberForm
            setShowForm={setShowForm}
            formData={formData}
            setFormData={setFormData}
            saveFamilyHandler={saveFamilyHandler}
            showForm={showForm}
          />
        )}
        {!showForm &&
          members?.map((member) => (
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
          ))}
      </div>
    </>
  );
};

export default App;
