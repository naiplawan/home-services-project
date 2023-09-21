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
  const [currentCategory, setCurrentCategory] = useState([])

    //state for sub_service
  const [subService, setSubService] = useState([])

  console.log('อันนี้ซับ', subService)

  const categoryName = currentCategory.category_name

  console.log(categoryName)

  

 

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      const serviceData = response.data.data;
      setCurrentCategory(response.data.data.category)
      setSubService(response.data.data.sub_service)

      console.log(serviceData)

      if (serviceData) {
        setService(serviceData);
      } else {
        // Handle the case where the data is not valid
        console.error("Service data is not valid:", serviceData);
      }

      console.log('data by id', response.data.data)
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

  // let hasMatchingValue = false;

  // for (const obj of service) {
  //   for (const key in obj) {
  //     if (obj[key] === category.category_id) {
  //       hasMatchingValue = true;
  //       break;
  //     }
  //   }
  // }

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
              <span className="text-grey700">ชื่อบริการ</span>
              <span className="px-[182px] text-black ">
                {service.service_name}
              </span>
            </p>
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">หมวดหมู่</span>
              <span className="px-[182px] text-black"
            >
               {categoryName}
              </span>
            </p>
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">รูปภาพ</span>
              <span className="px-[182px] text-black ">
               <img src={service.service_photo} />
              </span>
            </p>
            <hr className="py-[20px]" />
            <div className="mb-10 text-grey700 text-base font-medium ">
              รายการบริการย่อย
            </div>

            <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              <p>
              <span>ชื่อรายการ</span>
              <span>หน่วยการบริการ</span>
              <span>ค่าบริการ / 1 หน่วย</span>
              </p>

            </div>
           

           
             

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