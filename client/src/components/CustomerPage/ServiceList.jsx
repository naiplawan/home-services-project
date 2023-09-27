import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/CustomerPhoto/imageIndex.js";
import SellBlack from "../../assets/homepagePhoto/sellBlack.jsx";
import InputPriceRange from "./InputPriceRange";
// import { useAuth } from "../../contexts/authentication";
import { getMaxPrice, getMinPrice } from "../../utils/priceMinMax.js";

function ServiceList() {
  // const params = useParams();
  const navigate = useNavigate();
  // const auth = useAuth();
  // const { logout } = useAuth();

  // ***** About filter *****
  const [keywords, setKeywords] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(2000);
  const [orderFilter, setOrderFilter] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [hasClickedSearch, setHasClickedSearch] = useState(false);

  // handler event click [select category]
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // handler event click [price range dropdown]
  const handleDropdownToggle = () => {
    // ถ้า dropdown กำลังเปิด และยังไม่ได้คลิกค้นหา ให้รีเซ็ตค่า
    if (isDropdownVisible && !hasClickedSearch) {
      setMinPriceFilter(0);
      setMaxPriceFilter(2000);
    }
    setDropdownVisible(!isDropdownVisible);
  };
  const handlePriceRangeChange = ({ min, max }) => {
    console.log(`min = ${min}, max = ${max}`);
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  };

  // handler event click [sorting ยังไม่ได้ทำ]
  const handleSortChange = (event) => {
    setOrderFilter(event.target.value);
  };

  // state ส่วนนี้เกี่ยวกับปุ่ม"ค้นหา"  เงื่อนไขคือผลลัพธ์ของ filter จะเกิดขึ้นเมื่อกดปุ่มค้นหาเท่านั้น
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);

  // handler event click [search click ปุ่มค้นหา]
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
    setIsSearchClicked(true);
    setFilteredServices(newFilteredServices);
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
                <div className="price-range-filter relative inline-block">
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
                          max={2000}
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
              (isSearchClicked ? filteredServices : services.data).map(
                (service) => {
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
              )}
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
