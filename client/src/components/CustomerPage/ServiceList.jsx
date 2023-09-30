import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/CustomerPhoto/imageIndex.js";
import SellBlack from "../../assets/homepagePhoto/sellBlack.jsx";
import InputPriceRange from "./InputPriceRange";
import AlertBoxDelete from "../AlertBox.jsx";
import { useAuth } from "../../contexts/authentication";
import {
  getMaxPrice,
  getMinPrice,
  sortServices,
  getCategoryColor,
} from "../../utils/serviceList.js";

function ServiceList() {
  const navigate = useNavigate();

  // ***** About Authentication & authorization role *****
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

  // ***** About filter *****
  const [keywords, setKeywords] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(4000);
  const [orderFilter, setOrderFilter] = useState("recommend");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [hasClickedSearch, setHasClickedSearch] = useState(false);

  // handler event click [select category]
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // handler event click [price range dropdown]
  const handleDropdownToggle = () => {
    if (isDropdownVisible && !hasClickedSearch) {
      // ไม่ต้องรีเซ็ตค่าราคา
    }
    setDropdownVisible(!isDropdownVisible);
  };

  const handlePriceRangeChange = ({ min, max }) => {
    console.log(`min = ${min}, max = ${max}`);
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  };

  // handler event click [sorting]
  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    setOrderFilter(selectedOrder);
  };

  // state ส่วนนี้เกี่ยวกับปุ่ม"ค้นหา"  เงื่อนไขคือผลลัพธ์ของ filter จะเกิดขึ้นเมื่อกดปุ่มค้นหาเท่านั้น
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearchClick = () => {
    // ทำการกรองข้อมูลและตั้งค่า filteredServices ใหม่ตามเงื่อนไข
    const newFilteredServices = services.data.filter((service) => {
      const serviceCategory = service.category.category_name;
      const serviceName = service.service_name.toLowerCase();
      const servicePrice = getMinPrice(service.sub_service);

      // filter search
      const isKeywordMatch =
        !keywords || serviceName.includes(keywords.toLowerCase());

      // filter category dropdown
      const isCategoryMatch =
        !selectedCategory ||
        selectedCategory === "All" ||
        selectedCategory === serviceCategory;

      // filter price range
      const isPriceMatch =
        servicePrice >= minPriceFilter && servicePrice <= maxPriceFilter;

      return isCategoryMatch && isKeywordMatch && isPriceMatch;
    });

    // เรียงลำดับข้อมูล
    const sortedServices = sortServices(
      newFilteredServices,
      orderFilter,
      hasClickedSearch
    );

    setIsSearchClicked(true);
    setFilteredServices(sortedServices);
    setHasClickedSearch(true);
  };

  // ***** About Data Fetching *****
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // API for rendering category <select>/<option>
  const getCategory = async () => {
    try {
      const result = await axios("http://localhost:4000/category");
      setCategories(result.data.data);
      console.log("getCategory มีอะไร ", result.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
    }
  };

  // API for rendering services
  const handleSearch = async () => {
    try {
      setError(null);
      // await getCategory();
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
    handleSearch();
    getCategory();
  }, []);

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
                className="search-filter text-black  px-4 py-2 border-grey300 border bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-[318px] "
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <div className="w-[80px]"></div>
              <div className=" category-option-filter  ">
                <p className="pl-[10px] w-[120px] text-[12px] text-[#646C80]">
                  หมวดหมู่บริการ
                </p>
                <select
                  className="px-2 bg-white text-[16px] text-black font-semibold"
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
              <div className="line-1 border-[#CCD0D7] border-l border-[1px] h-[44px] "></div>{" "}
              <div>
                <p className="pl-[10px] w-[120px] text-[12px] text-[#646C80]">
                  ราคา
                </p>
                <div className="price-range-filter relative inline-block text-black font-semibold">
                  <p
                    className="cursor-pointer w-[150px] mb-1"
                    onClick={handleDropdownToggle}
                  >
                    {minPriceFilter} - {maxPriceFilter} ฿ ▾
                  </p>

                  {isDropdownVisible && (
                    <div className="dropdown-content bg-white w-64 h-28 absolute right-[-50px] top-[50px] rounded-md shadow-lg">
                      <div className="pt-[15px]">
                        <InputPriceRange
                          min={0}
                          max={4000}
                          minFilter={minPriceFilter}
                          setMinFilter={setMinPriceFilter}
                          maxFilter={maxPriceFilter}
                          setMaxFilter={setMaxPriceFilter}
                          onChange={handlePriceRangeChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="line-2 border-[#CCD0D7] border-l border-[1px] h-[44px] "></div>
              <div className="sort-filter">
                <p className="pl-[10px] text-[12px] text-[#646C80]">เรียงตาม</p>
                <select
                  className="px-2 bg-white text-black font-semibold"
                  value={orderFilter}
                  onChange={handleSortChange}
                >
                  <option value="recommend">บริการแนะนำ</option>
                  <option value="popular">บริการยอดนิยม</option>
                  <option value="ascending">ตามตัวอักษร (Ascending)</option>
                  <option value="descending">ตามตัวอักษร (Descending)</option>
                </select>
              </div>
              <div className="w-[80px]"></div>
              <button className="btn-primary" onClick={handleSearchClick}>
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
              (isSearchClicked ? (
                filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
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
                      <div className="p-2 md:p-5 bg-white min-h-full">
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
                  ))
                ) : (
                  <div className="text-center h-[500px]">
                    <h1 className="mt-[100px]">
                      ขออภัยค่ะ ไม่พบการค้นหาบริการที่ท่านต้องการ
                    </h1>
                    <p> หากลูกค้าต้องการบริการใดๆเพิ่มเติม</p>
                    <p>สามารถติดต่อสอบถามได้ที่ 080-540-6357</p>
                  </div>
                )
              ) : (
                services.data.map((service) => (
                  <div
                    key={service.id}
                    className="lg:mx-[37px] lg:w-[369px] mt-[48px] w-[25%] h-[35%] rounded-md overflow-hidden border border-[#CCD0D7] m-2"
                  >
                    <div className="img-display ">
                      <img
                        src={service.service_photo}
                        alt={service.sub_service.name}
                        className="w-full h-[210px] object-cover"
                      />
                    </div>
                    <div className="p-2 md:p-5 bg-white min-h-full">
                      <div
                        className={`text-center px-[10px] inline-block p-1 rounded-lg ${getCategoryColor(
                          service.category.category_name
                        )} `}
                      >
                        <p>{service.category.category_name}</p>
                      </div>
                      <h2 className="font-bold text-[20px] mt-3 text-black">
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
                ))
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
