// หน้าแรกที่มีการ fetching data มาแสดงรายการ 9 ช่อง และ filterbar
// หน้านี้จะถูก render ที่ไฟล์ page / CustomerServiceListDisplay.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/CustomerPhoto/imageIndex.js";
import "../../styles/App.css";

import SellBlack from "../../assets/homepagePhoto/sellBlack.jsx";
import FilterBar from "./FilterBar.jsx";

function ServiceList() {
  const navigate = useNavigate();
  const initialFilters = {
    searchText: "",
    category: "All",
    priceRange: "",
    sortBy: "popular",
  };

  const [filters, setFilters] = useState(initialFilters);
  const handleFilterChange = (newFilters) => {
    // Update the filters state with the new filters
    setFilters(newFilters);
    // Perform filtering or other actions based on the new filters
  };
  const filterServices = async () => {
    try {
      // สร้างคำขอ GET ไปยัง API โดยใช้ค่า filters
      const response = await axios.get("http://localhost:4000/service", {
        params: {
          searchText: filters.searchText,
          category: filters.category,
          priceRange: filters.priceRange,
          sortBy: filters.sortBy,
        },
      });

      const data = response.data.data;
      setServices(data); // เซ็ตข้อมูลใหม่ใน services state
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    filterServices(); // เรียกใช้ฟังก์ชันการกรองเมื่อ filters เปลี่ยนแปลง
  }, [filters]);

  //ราคา
  function getMinPrice(subServicesArray) {
    if (subServicesArray.length === 0) {
      return 0;
    }

    let minPrice = subServicesArray[0].price_per_unit;

    for (const subService of subServicesArray) {
      if (subService.price_per_unit < minPrice) {
        minPrice = subService.price_per_unit;
      }
    }

    return minPrice;
  }

  function getMaxPrice(subServicesArray) {
    if (subServicesArray.length === 0) {
      return 0;
    }

    let maxPrice = subServicesArray[0].price_per_unit;

    for (const subService of subServicesArray) {
      if (subService.price_per_unit > maxPrice) {
        maxPrice = subService.price_per_unit;
      }
    }

    return maxPrice;
  }

  // *** user สามารถดูรายการ services ทั้งหมดได้ ***
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // สร้าง function ใหม่เพื่อทำการโหลดข้อมูลจาก API
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/service");
        const data = response.data.data;
        setServices(data); // นำข้อมูลที่ได้มาเก็บใน state
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="Header relative">
        <img src={image.Header} alt="Test" className="inline" />
        <div className="absolute top-0 h-[100%] left-0 right-0 z-10 text-center text-black bg-[#00195199]"></div>
        <span className="absolute top-[64px]  left-0 right-0 z-10 text-center text-white ">
          <h1 className="text-[32px]">บริการของเรา</h1>
          <p>
            ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน และอื่น ๆ อีกมากมาย
            <br />
            โดยพนักงานแม่บ้าน และช่างมืออาชีพ
          </p>
        </span>
      </div>
      <FilterBar onFilterChange={handleFilterChange} />
      <section className="services">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className=" xl:px-[159px]  flex flex-wrap justify-center items-center top-20 pb-20 h-full bg-[#f0f0f0]">
            {services &&
              services.data &&
              services.data.map((service) => (
                <div
                  key={service.service_id}
                  className="lg:mx-[37px] lg:w-[369px] mt-[48px] w-[25%] h-[35%] rounded-md overflow-hidden border border-[#CCD0D7] m-2"
                >
                  <div className="img-display">
                    <img
                      className="w-full h-full object-cover"
                      src={service.service_photo}
                      alt={service.sub_service.name}
                    />
                  </div>
                  <div className="p-2 md:p-5 bg-white min-h-full">
                    <div className="bg-[#E7EEFF] text-center px-[10px] inline-block p-1 text-[#0E3FB0] rounded-lg">
                      <p>{service.category.category_name}</p>
                    </div>
                    <h2 className="font-bold text-[20px] mt-3">
                      {service.service_name}
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

                    <div>
                      <p
                        className="link text-l font-semibold text-[#336DF2]"
                        onClick={() =>
                          navigate(`/checkout/${service.service_id}`)
                        }
                      >
                        เลือกบริการ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
      <footer className="h-[284px] bg-[#336DF2] text-center flex justify-center items-center">
        <p className="text-[20px] text-white">
          เพราะเราคือช่าง ผู้ให้บริการเรื่องบ้านอันดับ 1 แบบครบวงจร
          โดยทีมช่างมืออาชีพมากกว่า 100 ทีม
          <br />
          สามารถตอบโจทย์ด้านการบริการเรื่องบ้านของคุณ และสร้าง
          <br />
          ความสะดวกสบายในการติดต่อกับทีมช่าง ได้ทุกที่ ทุกเวลา ตลอด 24 ชม.
          <br />
          มั่นใจ ช่างไม่ทิ้งงาน พร้อมรับประกันคุณภาพงาน
        </p>
        <img src="" />
      </footer>
    </>
  );
}

export default ServiceList;
