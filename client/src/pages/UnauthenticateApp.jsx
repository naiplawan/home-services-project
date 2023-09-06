// UnauthenticateApp คือ หน้าสำหรับ user ที่ยังไม่ได้ register
import { Routes, Route } from "react-router-dom";
import Homepage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import "../styles/App.css";
import NotFoundPage from "./NotFoundPage";


function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
