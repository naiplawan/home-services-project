import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";
import { Table } from "antd";

function AdminDetailService() {
  const [service, setService] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentCategory, setCurrentCategory] = useState([]);

  //state for sub_service
  const [subService, setSubService] = useState([]);

  const categoryName = currentCategory.category_name;

  console.log(categoryName);

  //access sub service on service to get subservice
  // const subServiceArray = service.sub_service;

  //   const subServicesInfo = subServiceArray.map(subService => {
  //     const pricePerUnit = subService.price_per_unit;
  //     const subServiceName = subService.sub_service_name;
  //     const unit = subService.unit;

  //     return {
  //         pricePerUnit,
  //         subServiceName,
  //         unit
  //     };
  // });

  // console.log(subServicesInfo);

  const subServiceArray = service.sub_service;
  // for (let i = 0; i < subServiceArray.length; i++) {
  //     const subService = subServiceArray[i];
  //     const pricePerUnit = subService.price_per_unit;
  //     const subServiceName = subService.sub_service_name;
  //     const unit = subService.unit;

  //     console.log(`Price per unit: ${pricePerUnit}`);
  //     console.log(`Sub service name: ${subServiceName}`);
  //     console.log(`Unit: ${unit}`);
  // }

  // subServiceArray.forEach(subService => {
  //     const pricePerUnit = subService.price_per_unit;
  //     const subServiceName = subService.sub_service_name;
  //     const unit = subService.unit;

  //     console.log(`Price per unit: ${pricePerUnit}`);
  //     console.log(`Sub service name: ${subServiceName}`);
  //     console.log(`Unit: ${unit}`);
  // });

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      setService(response.data.data);
      console.log(response.data.data);
      setCurrentCategory(response.data.data.category);
      setSubService(response.data.data.sub_service);
      console.log("data by id", response.data.data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        setCategory(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);

  return (
    <div className="bg-grey100 min-h-screen pb-[4%] pl-60 ">
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
              <span className="text-grey700">ชื่อบริการ</span>
              <span className="px-[182px] text-black ">
                {service.service_name}
              </span>
            </p>
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">หมวดหมู่</span>
              <span className="px-[182px] text-black">{categoryName}</span>
            </p>
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">รูปภาพ</span>
              <span className="px-[182px] text-black ">
                <img
                  className="px-[182px] text-black"
                  src={service.service_photo}
                />
              </span>
            </p>
            <hr className="py-[20px]" />
            <div className="mb-10 text-grey700 text-base font-medium ">
              รายการบริการย่อย
            </div>

            <div>
              {service.sub_service &&
                service.sub_service.map((subService, index) => (
                  <div
                    className="flex justify-between items-center gap-6"
                    key={index}
                  >
                    <div className="subServiceName self-stretch text-grey700 text-base">
                      ชื่อรายการ:
                      <div className="text-black">
                        {subService.sub_service_name}
                      </div>
                    </div>
                    <div className="subServiceName self-stretch text-grey700 text-base">
                      หน่วยการบริการ:
                      <div className="text-black">{subService.unit}</div>
                    </div>
                    <div className="subServiceName self-stretch text-grey700 text-base">
                      ค่าบริการ / 1 หน่วย:
                      <div className="text-black">
                        {subService.price_per_unit}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <p className="mt-10 pb-[25px] ">
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
