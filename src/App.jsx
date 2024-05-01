import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import MemberForm from "./components/MemberForm";

const App = () => {
  const [members, setMembers] = useState([]);
  const [addMembers, setAddMembers] = useState(false);
  const [editMembers, setEditMembers] = useState(false);
  const [formData, setFormData] = useState({
    hof: "",
    phone: [],
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
    setAddMembers(false);
  };

  const onDeleteFamily = (id) => {
    axios
      .delete(`http://localhost:8000/family/${id}`)
      .then((res) => fetchMembers())
      .catch((err) => console.log(err, "err"));
  };

  const onEditFamily = (id) => {
    setEditMembers(true);
    const editMember = members.filter((member) => member.id === id);
    setFormData(...editMember);
    console.log(formData);
  };

  return (
    <>
      <Header setAddMembers={setAddMembers} />
      <div className="wrapper">
        {editMembers && (
          <MemberForm formData={formData} setFormData={setFormData} />
        )}
        {addMembers && (
          <MemberForm
            setAddMembers={setAddMembers}
            formData={formData}
            setFormData={setFormData}
            addFamilyHandler={addFamilyHandler}
          />
        )}
        {!addMembers &&
          !editMembers &&
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
          ))}
      </div>
    </>
  );
};

export default App;
