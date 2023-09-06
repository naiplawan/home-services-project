// AuthenticatedApp คือหน้าที่สมาชิกสามารถเห็นได้เท่านั้น แบ่งออกเป็น 2 role

// request จากมิ้นท์ พวกเราอาจจะต้องมีตาราง API ค่ะ จะได้สร้าง Route path
// ตอนนี้ลอง route เท่าที่มีอยู่นะคะ
// หน้านี้คือจะ route เฉพาะ user ที่ register เรียบร้อยแล้วเท่านั้น ว่าจะเห็นอะไรได้บ้าง
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");
  return (
    <div className="App">
      {/* **ตรงนี้มิ้นท์เพิ่ม if else ของ role admin /role ที่ไม่ใช่ admin ว่าสามารถเข้าถึงอะไรได้บ้าง*/}
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
}
export default AuthenticatedApp;
