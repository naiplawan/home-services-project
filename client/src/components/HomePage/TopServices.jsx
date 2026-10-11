import { buttonStyles } from "@/lib/ui-classes.js";
import axios from "axios";
import AlertBoxDelete from "../AlertBox.jsx";
import SellBlack from "../../assets/homepagePhoto/SellBlack.jsx";
import { useNavigate } from "@/routing/navigation.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authentication";
import {
  getCategoryColor,
  getMaxPrice,
  getMinPrice,
} from "../../utils/serviceList.js";

function TopServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState({ data: [] });

  const getCategory = async () => {
    try {
      const response = await axios("/api/service");
      const serviceList = response.data?.data;
      setServices({ data: Array.isArray(serviceList) ? serviceList : [] });
    } catch (error) {
      console.error("Error fetching services:", error);
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
    <div className="flex h-full flex-col items-center justify-center bg-[#f0f0f0]">
      <div className="px-4 pt-12 text-center sm:pt-20">
        <h1 className="text-2xl font-bold text-[#001C59] sm:text-[32px]">
          บริการยอดฮิตของเรา
        </h1>
      </div>

      <section>
        <div className="grid h-full w-full grid-cols-1 items-stretch justify-items-center gap-5 bg-[#f0f0f0] px-4 pb-12 pt-8 sm:grid-cols-2 sm:px-8 sm:pb-20 lg:grid-cols-3 xl:px-[159px]">
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
                  className="m-2 mt-4 h-full w-full max-w-md overflow-hidden rounded-md border border-[#CCD0D7] lg:mt-8 lg:max-w-none"
                >
                  <div className="img-display">
                    <img
                      src={service.service_photo}
                      alt={service.sub_service.name}
                      className="aspect-[16/10] w-full object-cover"
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
                              className={buttonStyles.ghost}
                              onClick={() =>
                                navigate(`/checkout/${service.service_id}`)
                              }
                            >
                              เลือกบริการ
                            </button>
                          ) : (
                            <button
                              className={buttonStyles.ghost}
                              onClick={handleAlertRole}
                            >
                              เลือกบริการ
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          className={buttonStyles.ghost}
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

      <div className="pb-20 pt-8 sm:pb-40 sm:pt-12">
        <button
          className={buttonStyles.primary}
          onClick={() => navigate("/services-list")}
        >
          ดูบริการท้ังหมด
        </button>
      </div>
    </div>
  );
}

export default TopServices;
