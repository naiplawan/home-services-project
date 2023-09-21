import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";

function AdminDetailService() {
  const [service, setService] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      const serviceData = response.data.data;

      console.log(serviceData)

      if (serviceData) {
        setService(serviceData);
      } else {
        // Handle the case where the data is not valid
        console.error("Service data is not valid:", serviceData);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);

  return (
    <div className="bg-grey100 h-[100%] pb-[4%] pl-60 ">
      <div key={service.service_id}>
        <div className="header-detail justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
          <div className="flex">
            <img
              src={arrow}
              className=" h-[40px] w-[40px] cursor-pointer hover:scale-110 transition"
              onClick={() => navigate("/admin-service")}
            />
            <div className="Header-name">
              <p className="service-text text-xs">บริการ</p>
              <h1
                name={service.serviceDetail}
                className="text-black   font-semibold text-xl"
              >
                {service.service_name}
              </h1>
            </div>
          </div>
          <button
            className="btn-primary  h-[100%] w-[112px] p-[20px] text-white focus:outline-none "
            onClick={() =>
              navigate(`/admin-service-edit/${service.service_id}`)
            }
          >
            แก้ไข
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="detail-container w-[95%] rounded-lg border border-grey300 bg-white font-normal flex-col items-center  px-10 mt-10 pt-[20px] py-[10px] ">
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">ชื่อหมวดหมู่</span>
              <span className="px-[182px] text-black ">
                {service.service_name}
              </span>
            </p>
            <hr className="py-[20px]" />
            <p className="pb-[25px] ">
              <span className="text-grey700">สร้างเมื่อ</span>
              <span className="px-[200px] text-black ">
                {dateFormat(service.service_created_date)}
              </span>
            </p>
            <p className="pb-[40px] ">
              <span className="text-grey700">แก้ไขล่าสุด</span>
              <span className="px-[190px] text-black ">
                {dateFormat(service.service_edited_date)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailService;