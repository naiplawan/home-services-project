import "../../styles/App.css";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUtils } from "../../hooks/utils.js";
import image from "../../assets/AdminPhoto/imageIndex";

const AdminServiceHeader = () => {
    const navigate = useNavigate();
    const { searchService, setSearchService, setService } = useUtils;

    const searchServiceData = async () => {
      const results = await axios.get(
        `http://localhost:4000/service?keywords=${searchService}`
      );
      setService(results.data.data);
    };
  
    useEffect(() => {
      let timerId;
      timerId = setTimeout(searchServiceData, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }, [searchService]);

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
            className="px-4 py-2 border-grey300 border bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-[400px]"
          />
          <button
            className="btn-primary flex items-center ml-6"
            onClick={() => navigate("/admin-service-create")}
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