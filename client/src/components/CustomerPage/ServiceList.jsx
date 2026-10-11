import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "@/routing/navigation.jsx";
import axios from "axios";
import image from "../../assets/CustomerPhoto/imageIndex.js";
import { buttonStyles } from "@/lib/ui-classes.js";
import SellBlack from "../../assets/homepagePhoto/SellBlack.jsx";
import InputPriceRange from "./InputPriceRange";
import AlertBoxDelete from "../AlertBox.jsx";
import LoadingState from "@/components/ui/loading-state.jsx";
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
  const [isLoading, setIsLoading] = useState(true);

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
  const [services, setServices] = useState({ data: [] });
  const [categories, setCategories] = useState({ data: [] });
  const [error, setError] = useState(null);
  const serviceRequestId = useRef(0);

  // API for rendering category <select>/<option>
  const getCategory = useCallback(async () => {
    try {
      const result = await axios("/api/category");
      const categoryResult = result.data?.data;
      setCategories(
        Array.isArray(categoryResult)
          ? { data: categoryResult }
          : categoryResult && Array.isArray(categoryResult.data)
            ? categoryResult
            : { data: [] },
      );
      console.log("getCategory มีอะไร ", result.data.data);
    } catch {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
    }
  }, []);

  // API for rendering services
  const handleSearch = useCallback(async () => {
    const requestId = ++serviceRequestId.current;
    setIsLoading(true);
    try {
      setError(null);
      // await getCategory();
      const response = await axios.get(
        `/api/service?keywords=${keywords}&categoryFilter=${selectedCategory}&maxPriceFilter=${maxPriceFilter}&minPriceFilter=${minPriceFilter}&orderFilter=${orderFilter}`
      );

      if (response.data.error) {
        if (requestId === serviceRequestId.current) {
          setError("เกิดข้อผิดพลาดในการค้นหา");
        }
      } else {
        const serviceResult = response.data?.data;
        const serviceList = Array.isArray(serviceResult)
          ? serviceResult
          : serviceResult?.data;
        if (!Array.isArray(serviceList)) {
          if (requestId === serviceRequestId.current) {
            setServices({ data: [] });
            setError("เกิดข้อผิดพลาดในการค้นหา");
          }
          return;
        }
        if (requestId === serviceRequestId.current) {
          setServices({ data: serviceList });
        }
        console.log("ผลลัพธ์การค้นหา", serviceList);
      }
    } catch (error) {
      if (requestId === serviceRequestId.current) {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    } finally {
      if (requestId === serviceRequestId.current) {
        setIsLoading(false);
      }
    }
  }, [keywords, selectedCategory, maxPriceFilter, minPriceFilter, orderFilter]);

  console.log("อันนี้คือคำค้นหา", keywords);
  console.log("อันนี้คือหมวดหมู่", selectedCategory);
  console.log("ราคาต่ำสุด", minPriceFilter);
  console.log("ราคาสูงสุด", maxPriceFilter);
  console.log("เรียงตาม", orderFilter);

  useEffect(() => {
    handleSearch();
    getCategory();
  }, [handleSearch, getCategory]);

  return (
    <>
      <div>
        <header>
          <div className="Header relative">
            <img src={image.Header} alt="" className="block h-[220px] w-full object-cover sm:h-[280px] lg:h-auto" />
            <div className="absolute inset-0 z-10 bg-[#00195199]"></div>
            <span className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-4 text-center text-white">
              <h1 className="text-2xl sm:text-[32px]">บริการของเรา</h1>
              <p>
                ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน และอื่น ๆ อีกมากมาย
                <br />
                โดยพนักงานแม่บ้าน และช่างมืออาชีพ
              </p>
            </span>
          </div>
        </header>

        <div className="filter-bar sticky top-0 z-[100] border-b border-[#CCD0D7] bg-white p-3 sm:p-5">
          <div className="container mx-auto">
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-x-4 xl:px-[120px]">
              <input
                type="text"
                placeholder="ค้นหาบริการ"
                className="search-filter w-full min-w-0 rounded-lg border border-grey300 bg-white px-4 py-2 text-black focus:border-blue-300 focus:outline-none focus:ring lg:w-[318px]"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <div className="hidden w-[80px] lg:block"></div>
              <div className="category-option-filter min-w-0">
                <p className="pl-[10px] text-[12px] text-[#646C80]">
                  หมวดหมู่บริการ
                </p>
                <select
                  className="w-full max-w-full bg-white px-2 text-sm font-semibold text-black sm:text-base"
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
              <div className="line-1 hidden h-[44px] border-l border-[#CCD0D7] lg:block"></div>{" "}
              <div>
                <p className="pl-[10px] text-[12px] text-[#646C80]">
                  ราคา
                </p>
                <div className="price-range-filter relative inline-block text-black font-semibold">
                  <p
                    className="mb-1 w-full cursor-pointer sm:w-[150px]"
                    onClick={handleDropdownToggle}
                  >
                    {minPriceFilter} - {maxPriceFilter} ฿ ▾
                  </p>

                  {isDropdownVisible && (
                    <div className="dropdown-content absolute left-0 top-[calc(100%+0.5rem)] z-20 h-28 w-64 max-w-[calc(100vw-2rem)] rounded-md bg-white shadow-lg sm:left-auto sm:right-[-50px]">
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
              <div className="line-2 hidden h-[44px] border-l border-[#CCD0D7] lg:block"></div>
              <div className="sort-filter min-w-0">
                <p className="pl-[10px] text-[12px] text-[#646C80]">เรียงตาม</p>
                <select
                  className="w-full max-w-full bg-white px-2 font-semibold text-black"
                  value={orderFilter}
                  onChange={handleSortChange}
                >
                  <option value="recommend">บริการแนะนำ</option>
                  <option value="popular">บริการยอดนิยม</option>
                  <option value="ascending">ตามตัวอักษร (Ascending)</option>
                  <option value="descending">ตามตัวอักษร (Descending)</option>
                </select>
              </div>
              <div className="hidden w-[80px] lg:block"></div>
              <button className={`${buttonStyles.primary} w-full sm:col-span-2 lg:w-auto`} onClick={handleSearchClick}>
                ค้นหา
              </button>
            </div>
          </div>
        </div>

        <section>
          {isLoading ? (
            <div className="bg-[#f0f0f0] px-4 py-8 sm:px-8 xl:px-[159px]">
              <LoadingState label="กำลังโหลดบริการ" />
            </div>
          ) : error ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-4 bg-[#f0f0f0] px-4 py-8 text-center">
              <p className="text-red-600">{error}</p>
              <button className={buttonStyles.primary} onClick={handleSearch}>
                ลองอีกครั้ง
              </button>
            </div>
          ) : (
          <div className="grid h-full grid-cols-1 items-stretch justify-items-center gap-5 bg-[#f0f0f0] px-4 pb-16 pt-8 sm:grid-cols-2 sm:px-8 xl:grid-cols-3 xl:px-[159px]">
            {services &&
              services.data &&
              Array.isArray(services.data) &&
              (isSearchClicked ? (
                filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="m-2 mt-4 h-full w-full max-w-md overflow-hidden rounded-md border border-[#CCD0D7] xl:max-w-none"
                    >
                      <div className="img-display">
                        <img
                          src={service.service_photo}
                          alt={service.sub_service.name}
                          className="aspect-[16/10] w-full object-cover"
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
                  ))
                ) : (
                  <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center sm:col-span-2 xl:col-span-3">
                    <h1 className="mb-3">
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
                    className="m-2 mt-4 h-full w-full max-w-md overflow-hidden rounded-md border border-[#CCD0D7] xl:max-w-none"
                  >
                    <div className="img-display ">
                      <img
                        src={service.service_photo}
                        alt={service.sub_service.name}
                        className="aspect-[16/10] w-full object-cover"
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
                ))
              ))}
          </div>
          )}
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

        <footer className="flex min-h-[220px] items-center justify-center bg-[#336DF2] px-5 py-10 text-center sm:min-h-[284px]">
          <p className="text-base text-white sm:text-[20px]">
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
