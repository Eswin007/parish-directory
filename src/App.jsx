import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";

const App = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const membersList = await axios.get("http://localhost:8000/family");
    setMembers(membersList.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <Header />
      <div className="wrapper">
        {members?.map((member) => (
          <Family
            key={member.id}
            hof={member?.hof}
            email={member?.email}
            parish={member?.mother_parish}
            address={member?.address}
            phone={member?.phone}
            members={member?.members}
          />
        ))}
      </div>
    </>
  );
};

export default App;
