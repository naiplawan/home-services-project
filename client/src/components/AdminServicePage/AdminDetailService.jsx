import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "@/routing/navigation.jsx";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";
import assetUrl from "../../assets/assetUrl.js";
import { buttonStyles } from "@/lib/ui-classes.js";

function AdminDetailService() {
  const [service, setService] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const [currentCategory, setCurrentCategory] = useState([]);

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
        `/api/service/${serviceId}`
      );
      setService(response.data.data);
      console.log(response.data.data);
      setCurrentCategory(response.data.data.category);
      console.log("data by id", response.data.data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);

  return (
    <div className="min-h-screen bg-grey100 pb-8 pl-14 lg:pb-[4%] lg:pl-60">
      <div key={service.service_id}>
        <div className="header-detail flex min-h-20 items-center justify-between gap-3 border-b border-grey300 bg-white px-3 py-3 text-grey600 sm:px-6 lg:px-10">
          <div className="flex">
            <img
              src={assetUrl(arrow)}
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
            className={`${buttonStyles.primary} h-10 w-28 p-2.5`}
            onClick={() =>
              navigate(`/admin-service-edit/${service.service_id}`)
            }
          >
            แก้ไข
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="detail-container mt-6 flex w-[calc(100%-2rem)] flex-col items-start rounded-lg border border-grey300 bg-white px-4 py-5 font-normal sm:mt-10 sm:w-[95%] sm:px-10">
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">ชื่อบริการ</span>
              <span className="break-words px-2 text-black sm:px-4 lg:px-[182px]">
                {service.service_name}
              </span>
            </p>
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">หมวดหมู่</span>
              <span className="break-words px-2 text-black sm:px-4 lg:px-[182px]">{categoryName}</span>
            </p>
            <p className="pb-[40px] pt-[20px] ">
              <span className="text-grey700">รูปภาพ</span>
              <span className="px-2 text-black sm:px-4 lg:px-[182px]">
                <img
                  className="mt-3 max-h-72 max-w-full object-contain sm:mt-0 sm:inline-block sm:align-middle"
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
                    className="flex flex-col justify-between gap-3 border-b border-grey200 py-4 sm:flex-row sm:items-center sm:gap-6"
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
              <span className="px-2 text-black sm:px-4 lg:px-[200px]">
                {dateFormat(service.service_created_date)}
              </span>
            </p>
            <p className="pb-[40px] ">
              <span className="text-grey700">แก้ไขล่าสุด</span>
              <span className="px-2 text-black sm:px-4 lg:px-[190px]">
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
