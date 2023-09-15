import "../../styles/App.css";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUtils } from "../../hooks/utils.js";
import image from "../../assets/AdminPhoto/imageIndex";

const AdminServiceHeader = (props) => {
    const navigate = useNavigate();
    const {
      category,
      searchService,
      setSearchService,
      setService,
      getCategory,
      orderFilter,
      setOrderFilter,
      categoryFilter,
      setCategoryFilter,
      minFilter, setMinFilter, maxFilter, setMaxFilter
    } = useUtils();

    const searchServiceData = async () => {
      const results = await axios.get(
        `http://localhost:4000/service?keywords=${searchService}&categoryFilter=${categoryFilter}&maxPriceFilter=${maxFilter}&minPriceFilter=${minFilter}`
      );
      setService(results.data.data);
      console.log(results.data.data);
    };
  
    useEffect(() => {
      let timerId;
      timerId = setTimeout(searchServiceData, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }, []);

    useEffect(() => {
      getCategory();
    }, []);

    return (
      <header className="sticky top-0 bg-white">
      <div className="pl-60 flex items-center h-20 pr-10 justify-between border-b border-grey300 ">
        <h1 className="text-xl font-medium text-black pl-10">บริการ</h1>
        <div className="flex">
          <input
            id="search-text"
            name="search-text"
            type="text"
            placeholder="ค้นหาบริการ..."
            value={searchService}
            onChange={(event) => {
              setSearchService(event.target.value);
            }}
            className="border rounded-lg border-grey300 py-2.5 px-4"
          />
          <button
            className="btn-primary flex items-center ml-6"
            onClick={() => navigate("/admin-create-service")}
          >
            <div className="text-base font-medium mr-3">เพิ่มบริการ</div>
            <img src={image.plusSign} alt="Plus Symbol" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminServiceHeader