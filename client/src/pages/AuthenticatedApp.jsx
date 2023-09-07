// AuthenticatedApp คือหน้าที่สมาชิกสามารถเห็นได้เท่านั้น แบ่งออกเป็น 2 role

// request จากมิ้นท์ พวกเราอาจจะต้องมีตาราง API ค่ะ จะได้สร้าง Route path
// ตอนนี้ลอง route เท่าที่มีอยู่นะคะ
// หน้านี้คือจะ route เฉพาะ user ที่ register เรียบร้อยแล้วเท่านั้น ว่าจะเห็นอะไรได้บ้าง
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import AdminDashboard from "./AdminDashboard";

function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");

  return (
    <div className="App">
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
}
export default AuthenticatedApp;

// function AuthenticatedApp() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/admin" element={<AdminDashboard />}></Route>
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </div>
//   );
// }
// export default AuthenticatedApp;
