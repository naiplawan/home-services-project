import "../../styles/App.css";
import axios from "axios";
import AlertBoxDelete from "../AlertBox.jsx";
import SellBlack from "../../assets/homepagePhoto/sellBlack.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authentication";
import {
  getCategoryColor,
  getMaxPrice,
  getMinPrice,
} from "../../utils/serviceList.js";

function TopServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  const getCategory = async () => {
    try {
      const response = await axios("http://localhost:4000/service");
      setServices(response.data.data);
      console.log("ผลลัพธ์การค้นหา", response.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
    }
  };

  const auth = useAuth();
  const { logout } = useAuth();
  const role = localStorage.getItem("role");
  const [alertRole, setAlertRole] = useState();

  const handleAlertRole = () => {
    setAlertRole(true);
  };
  const handleLogout = () => {
    setAlertRole(false);
    logout();
  };

  const hide = () => {
    setAlertRole(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center top-20 h-full bg-[#f0f0f0]">
      <div className="pt-20">
        <h1 className="text-[#001C59] font-bold text-[32px]">
          บริการยอดฮิตของเรา
        </h1>
      </div>

      <section>
        <div className="xl:px-[159px] flex flex-wrap justify-center items-center top-20 pb-20 h-full bg-[#f0f0f0]">
          {services &&
            services.data &&
            Array.isArray(services.data) &&
            services.data
              .filter(
                (service) =>
                  service.service_name === "ทำความสะอาดทั่วไป" ||
                  service.service_name === "ล้างแอร์" ||
                  service.service_name === "ซ่อมเครื่องซักผ้า"
              )
              .map((service) => (
                <div
                  key={service.id}
                  className="lg:mx-[37px] lg:w-[369px] mt-[48px] w-[25%] h-[35%] rounded-md overflow-hidden border border-[#CCD0D7] m-2"
                >
                  <div className="img-display">
                    <img
                      src={service.service_photo}
                      alt={service.sub_service.name}
                      className="w-full h-[210px] object-cover"
                    />
                  </div>
                  <div className="p-2 md:p-5 bg-white min-h-full ">
                    <div
                      className={`text-center px-[10px] inline-block p-1 rounded-lg ${getCategoryColor(
                        service.category.category_name
                      )} `}
                    >
                      <p>{service.category.category_name}</p>
                    </div>
                    <h2 className="font-bold text-[20px] mt-3 text-black ">
                      {service.service_name.length > 30
                        ? `${service.service_name.substring(0, 30)}...`
                        : service.service_name}
                    </h2>
                    <div className="flex items-center">
                      <SellBlack />
                      <p className="ml-2 text-[#646C80] text-sm py-[10px]">
                        {getMinPrice(service.sub_service) !==
                        getMaxPrice(service.sub_service)
                          ? `ค่าบริการประมาณ ${getMinPrice(
                              service.sub_service
                            )} - ${getMaxPrice(service.sub_service)} ฿`
                          : `ค่าบริการประมาณ ${getMinPrice(
                              service.sub_service
                            )} ฿`}
                      </p>
                    </div>
                    <div className="button-authentication">
                      {auth.isAuthenticated ? (
                        <div className="mt-[-20px]">
                          {role === "customer" ? (
                            <button
                              className="btn-ghost"
                              onClick={() =>
                                navigate(`/checkout/${service.service_id}`)
                              }
                            >
                              เลือกบริการ
                            </button>
                          ) : (
                            <button
                              className="btn-ghost"
                              onClick={handleAlertRole}
                            >
                              เลือกบริการ
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          className="btn-ghost"
                          onClick={() => navigate(`/login`)}
                        >
                          เลือกบริการ
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {alertRole && (
          <AlertBoxDelete
            deleteFunction={handleLogout}
            hideFunction={hide}
            textAlert="ไม่สามารถเลือกบริการได้"
            alertQuestion={`คุณต้องเข้าสู่ระบบเป็น Customer`}
            primary="ออกจากระบบ"
            secondary="ยกเลิก"
          />
        )}
      </section>

      <div className="pt-12 pb-40">
        <button
          className="btn-primary"
          onClick={() => navigate("/services-list")}
        >
          ดูบริการท้ังหมด
        </button>
      </div>
    </div>
  );
}

export default TopServices;
