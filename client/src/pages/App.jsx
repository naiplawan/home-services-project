import "../styles/App.css";
import RegisterForm from "./RegisterPage";
import LoginForm from "./LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <LoginForm/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/Register" element={RegisterForm} />
          <Route path="/Login" element={LoginForm} />
        </Routes>
      </BrowserRouter>
      <LoginForm/> */}
    </>
  );
}

export default App;
