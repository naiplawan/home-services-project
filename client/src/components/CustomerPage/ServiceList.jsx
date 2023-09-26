import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/CustomerPhoto/imageIndex.js";
import SellBlack from "../../assets/homepagePhoto/sellBlack.jsx";
import InputPriceRange from "./InputPriceRange";
import { useAuth } from "../../contexts/authentication";

function ServiceList() {
  // const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const { logout } = useAuth();

  //dropdown price range
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  //filter bar states
  const [keywords, setKeywords] = useState("");
  // const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(2000);
  const [orderFilter, setOrderFilter] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setOrderFilter(event.target.value);
  };

  // state ของการเรียกข้อมูล
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // ใช้ api category มาเป็นตัวเลือกใน tag option
  const getCategory = async () => {
    try {
      const result = await axios("http://localhost:4000/category");
      setCategories(result.data.data);
      console.log("category จริงอ้ะเป่าาา ", result.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
    }
  };

  // ผลลัพธ์เมื่อกดปุ่มค้นหา
  const handleSearch = async () => {
    try {
      setError(null);
      await getCategory();
      const response = await axios.get(
        `http://localhost:4000/service?keywords=${keywords}&categoryFilter=${selectedCategory}&maxPriceFilter=${maxPriceFilter}&minPriceFilter=${minPriceFilter}&orderFilter=${orderFilter}`
      );

      if (response.data.error) {
        setError("เกิดข้อผิดพลาดในการค้นหา");
      } else {
        setServices(response.data.data);
        console.log("ผลลัพธ์การค้นหา", response.data.data);
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์", error.message);
    }
  };

  console.log("อันนี้คือคำค้นหา", keywords);
  console.log("อันนี้คือหมวดหมู่", selectedCategory);
  console.log("ราคาต่ำสุด", minPriceFilter);
  console.log("ราคาสูงสุด", maxPriceFilter);
  console.log("เรียงตาม", orderFilter);

  useEffect(() => {
    // สร้างฟังก์ชัน handleSearch เพื่อเรียก API โดยใช้ค่าปัจจุบันของพารามิเตอร์
    handleSearch();
    getCategory();
  }, [keywords]);

  return (
    <>
      <div>
        <header>
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
        </header>

        <div className="filter-bar flex items-center p-5 sticky top-0 z-[100] bg-white border-b-[1px] border-[#CCD0D7]">
          <div className="container mx-auto">
            <div className="xl:px-[120px] flex row items-center space-x-4 justify-between">
              <input
                type="text"
                placeholder="ค้นหาบริการ"
                className="px-4 py-2 border-grey300 border bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-[318px] "
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <div className="w-[80px]"></div>
              <div>
                <p className="pl-[10px] w-[120px] text-[12px] text-[#646C80]">
                  หมวดหมู่บริการ
                </p>
                <select
                  className="px-2 bg-white text-[16px]"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="All">บริการทั้งหมด</option>
                  {categories.data &&
                    categories.data.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_name}
                      >
                        {category.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="border-[#CCD0D7] border-l border-[1px] h-[44px] "></div>{" "}
              <div>
                <p className="pl-[10px] w-[120px] text-[12px] text-[#646C80]">
                  ราคา
                </p>
                <div className="relative inline-block">
                  <p
                    className="cursor-pointer w-[150px] mb-1"
                    onClick={() => setDropdownVisible(!isDropdownVisible)}
                  >
                    {minPriceFilter} - {maxPriceFilter} ฿ ▾
                  </p>

                  {isDropdownVisible && (
                    <div className="dropdown-content bg-white w-64 h-28 absolute right-[-50px] top-[50px] rounded-md shadow-lg">
                      <div className="pt-[15px]">
                        <InputPriceRange
                          min={0}
                          max={2000}
                          minFilter={minPriceFilter}
                          setMinFilter={setMinPriceFilter}
                          maxFilter={maxPriceFilter}
                          setMaxFilter={setMaxPriceFilter}
                          onChange={({ min, max }) =>
                            console.log(`min = ${min}, max = ${max}`)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-[#CCD0D7] border-l border-[1px] h-[44px] "></div>
              <div>
                <p className="pl-[10px] text-[12px] text-[#646C80]">เรียงตาม</p>
                <select className="px-2 bg-white">
                  <option value="popular">บริการแนะนำ</option>
                  <option value="popular">บริการยอดนิยม</option>
                  <option value="alphabetical">ตามตัวอักษร (Ascending)</option>
                  <option value="alphabetical">ตามตัวอักษร (Descending)</option>
                </select>
              </div>
              <div className="w-[80px]"></div>
              <button className="btn-primary" onClick={handleSearch}>
                ค้นหา
              </button>
            </div>
          </div>
        </div>

        <section>
          <div className="xl:px-[159px] flex flex-wrap justify-center items-center top-20 pb-20 h-full bg-[#f0f0f0]">
            {services &&
              services.data &&
              Array.isArray(services.data) &&
              services.data.map((service) => {
                if (
                  (!selectedCategory ||
                    selectedCategory === "All" ||
                    selectedCategory === service.category.category_name) &&
                  (!keywords ||
                    service.service_name
                      .toLowerCase()
                      .includes(keywords.toLowerCase()))
                ) {
                  return (
                    <div
                      key={service.id}
                      className="lg:mx-[37px] lg:w-[369px] mt-[48px] w-[25%] h-[35%] rounded-md overflow-hidden border border-[#CCD0D7] m-2"
                    >
                      <div className="img-display">
                        <img
                          src={service.service_photo}
                          alt={service.sub_service.name}
                          className="w-full h-full object-cover"
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
                  );
                }
                return null;
              })}
          </div>
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
      </div>
    </>
  );
}
export default ServiceList;

// function min Price / max price

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
