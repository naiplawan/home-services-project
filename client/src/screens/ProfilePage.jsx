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
        <div className="flex min-h-screen items-start justify-center bg-green900 px-4 py-8 sm:items-center">
        <Space direction="vertical" className="w-full max-w-[600px]">
            
            <Card title="Profile Detail" className="w-full">
              <p className="break-words">Full Name: {fullName}</p>
              <p>Phone Number: {phoneNumber}</p>
              <p className="break-all">Email: {email}</p>
            </Card>
        </Space>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
