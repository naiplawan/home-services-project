import { useState, useEffect } from "react";
import { Card, Space } from "antd";
import Navbar from "../components/Navbar";
import LoadingState from "@/components/ui/loading-state.jsx";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");

  return (
    <div >
      <Navbar />
      {loading ? (
        <LoadingState label="กำลังโหลดข้อมูลโปรไฟล์" />
      ) : (
        <div className=" flex  justify-center bg-green900 h-screen items-center">
        <Space direction="vertical" size={200}>
            
            <Card title="Profile Detail" style={{ width: 600, height:900 }}>
              <p >Full Name: {fullName}</p>
              <p>Phone Number: {phoneNumber}</p>
              <p>Email: {email}</p>
            </Card>
        </Space>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
