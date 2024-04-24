import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import AddMembers from "./components/AddMembers";

const App = () => {
  const [members, setMembers] = useState([]);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [formData, setFormData] = useState({
    hof: "",
    phone1: "",
    phone2: "",
    email: "",
    mother_parish: "",
    address: "",
  });

  const fetchMembers = async () => {
    const membersList = await axios.get("http://localhost:8000/family");
    setMembers(membersList.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const addFamilyHandler = async (formvalues) => {
    console.log(formvalues, "form-values");
    await axios.post("http://localhost:8000/family", formvalues);
    await fetchMembers();
    setShowAddMembers(false);
  };

  const onDeleteFamily = (id) => {
    axios
      .delete(`http://localhost:8000/family/${id}`)
      .then((res) => fetchMembers())
      .catch((err) => console.log(err, "err"));
  };

  const onEditFamily = (id) => {
    setShowAddMembers(true);
    const editMember = members.filter((member) => member.id === id);
    setFormData(...editMember);
    console.log(formData);
  };

  return (
    <>
      <Header setShowAddMembers={setShowAddMembers} />
      <div className="wrapper">
        {showAddMembers ? (
          <AddMembers
            setShowAddMembers={setShowAddMembers}
            formData={formData}
            setFormData={setFormData}
            addFamilyHandler={addFamilyHandler}
          />
        ) : (
          members?.map((member) => (
            <Family
              key={member.id}
              id={member.id}
              hof={member?.hof}
              email={member?.email}
              parish={member?.mother_parish}
              address={member?.address}
              phone={member?.phone}
              members={member?.members}
              onDeleteFamily={onDeleteFamily}
              onEditFamily={onEditFamily}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
