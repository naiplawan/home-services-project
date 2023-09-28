import { useState, useEffect } from "react";
import { Card, Space } from "antd";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    setUser(userData);
    setLoading(false);
  }, []);

  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");

  return (
    <div >
      <Navbar />
      {loading ? (
        <p>Loading...</p>
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