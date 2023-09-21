// FilterBar.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import InputPriceRange from "./InputPriceRange";

function FilterBar({ onFilterChange }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  //InputPriceRange
  const [minFilter, setMinFilter] = useState(0);
  const [maxFilter, setMaxFilter] = useState(2000);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSearchBarExpanded, setSearchBarExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch services from your API
        const servicesResponse = await axios.get(
          "http://localhost:4000/service"
        );
        const servicesData = servicesResponse.data.data;
        setServices(servicesData);

        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false); // Set loading to false even on error
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterSubmit = () => {
    const filters = {
      searchText,
      category: selectedCategory,
      priceRange,
      sortBy,
    };
    onFilterChange(filters);
  };

  return (
    <div className="flex p-5 sticky top-0 z-[100] bg-white border-b-[1px] border-[#CCD0D7]">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto">
          <div className="xl:px-[120px] flex row items-center space-x-4 justify-between">
            <input
              type="text"
              placeholder="ค้นหาบริการ"
              className={`px-4 py-2 border-grey300 border bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-[318px] ${
                isSearchBarExpanded ? "w-[500px]" : ""
              }`}
              value={searchText}
              onChange={handleSearchChange}
              onFocus={() => setSearchBarExpanded(true)}
              onBlur={() => setSearchBarExpanded(false)}
            />
            <div className="w-[80px]"></div>
            <div>
              <p className="pl-[10px] text-[12px] text-[#646C80]">
                หมวดหมู่บริการ
              </p>
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="px-2 bg-white text-[16px]"
              >
                <option value="All">บริการทั้งหมด</option>
                {services &&
                  services.data &&
                  services.data
                    .reduce((uniqueCategories, service) => {
                      if (
                        !uniqueCategories.includes(
                          service.category.category_name
                        )
                      ) {
                        uniqueCategories.push(service.category.category_name);
                      }
                      return uniqueCategories;
                    }, [])
                    .map((categoryName, index) => (
                      <option key={index} value={categoryName}>
                        {categoryName}
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
                  {minFilter} - {maxFilter} ฿ ▾
                </p>
                {isDropdownVisible && (
                  <div className="dropdown-content bg-white w-64 h-28 absolute right-[-50px] top-[50px] rounded-md shadow-lg">
                    <div className="pt-[15px]">
                      <InputPriceRange
                        min={0}
                        max={2000}
                        minFilter={minFilter}
                        setMinFilter={setMinFilter}
                        maxFilter={maxFilter}
                        setMaxFilter={setMaxFilter}
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
              <p className="pl-[10px] text-[12px] text-[#646C80]">
                หมวดหมู่บริการ
              </p>
              <select
                onChange={handleSortByChange}
                value={sortBy}
                className="px-2 bg-white"
              >
                <option value="popular">บริการแนะนำ</option>
                <option value="alphabetical">ตามตัวอักษร</option>
              </select>
            </div>
            <div className="w-[80px]"></div>
            <button className="btn-primary" onClick={handleFilterSubmit}>
              ค้นหา
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
