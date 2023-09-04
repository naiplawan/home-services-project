// request จากมิ้นท์ พวกเราอาจจะต้องมีตาราง API ค่ะ จะได้สร้าง Route path
// ตอนนี้ลอง route เท่าที่มีอยู่นะคะ
// หน้านี้คือจะ route เฉพาะ user ที่ register เรียบร้อยแล้วเท่านั้น ว่าจะเห็นอะไรได้บ้าง
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}
export default AuthenticatedApp;
