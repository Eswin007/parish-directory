import "./scss/main.scss";
import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Members from "./components/Members";

const App = () => {
  return (
    <>
      <Header />
      <Family />
    </>
  );
};

export default App;
