// AuthenticatedApp คือหน้าที่สมาชิกสามารถเห็นได้เท่านั้น แบ่งออกเป็น 2 role

// request จากมิ้นท์ พวกเราอาจจะต้องมีตาราง API ค่ะ จะได้สร้าง Route path
// ตอนนี้ลอง route เท่าที่มีอยู่นะคะ
// หน้านี้คือจะ route เฉพาะ user ที่ register เรียบร้อยแล้วเท่านั้น ว่าจะเห็นอะไรได้บ้าง
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import AdminDashboard from "./AdminDashboard";

// function AuthenticatedApp() {
//   const navigate = useNavigate();
//   // ตรวจสอบบทบาทของผู้ใช้และกำหนดเส้นทางที่เหมาะสม
//   const userRole = getUserRole(); // ฟังก์ชันในการตรวจสอบบทบาทของผู้ใช้

//   return (
//     <div className="App">
//       <Routes>
//         {userRole === "admin" && (
//           <>
//             <Route path="/dashboard" element={<AdminDashboard />} />
//             <Route path="/" element={<HomePage />} />
//           </>
//         )}

//         {userRole === "customer" && (
//           <>
//             <Route path="/dashboard" element={<AdminDashboard />} />
//             <Route path="/" element={<HomePage />} />
//           </>
//         )}
//         <Route path="/*" element={<NotFoundPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default AuthenticatedApp;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// function AuthenticatedApp() {
//   const loginRole = localStorage.getItem("role"); // access ตรงนี้อาจจะผิด !!!!

//   return (
//     <div className="App">
//       {loginRole === "admin" ? (
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       ) : (
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       )}
//     </div>
//   );
// }
// export default AuthenticatedApp;

function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");
  return (
    <div className="App">
      {/* **ตรงนี้มิ้นท์เพิ่ม if else ของ role admin /role ที่ไม่ใช่ admin ว่าสามารถเข้าถึงอะไรได้บ้าง*/}
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
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
