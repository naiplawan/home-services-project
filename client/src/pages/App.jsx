import RegisterPage from "./RegisterPage";
import "../styles/App.css";
import { Button } from "antd";
import Navbar from "../components/Navbar";

function App() {
  return (
    <>
    <Navbar/>
      <div className="text-10xl font-bold underline ">Hello world!</div>
      <div></div>
      <Button type="primary">Button</Button>

      <RegisterPage />
    </>
  );
}

export default App;
