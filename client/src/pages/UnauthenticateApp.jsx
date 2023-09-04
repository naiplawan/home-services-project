// routes หน้านี้สำหรับ user ที่ยังไม่ได้ register

import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./styles/App.css";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
