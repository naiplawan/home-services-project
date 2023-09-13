import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/AdminPhoto/imageIndex";

const AdminServiceHeader = () => {
    const navigate = useNavigate();
    const [searchService, setSearchService] = useState("");
    const [service, setService] = useState([])

    const searchServiceData = async () => {
        const results = await axios.get(
            `http://localhost:4000/service?keywords=${searchService}`
        );
        setService(results.data.data);
        console.log(results.data.data);
    };

    useEffect(() => {
        let timerId = setTimeout(searchServiceData, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [searchService]);

    return (
        <header className="sticky top-0 bg-white">
            <div className="pl-60 flex items-center h-20 pr-10 justify-between border-b border-grey300 ">
              <h1 className="text-xl font-medium pl-10">บริการ</h1>
              <div className="flex">
                <input
                  id="search-text"
                  name="search-text"
                  type="text"
                  placeholder="ค้นหาบริการ..."
                  onChange={(event) => {
                    setSearchService(event.target.value);
                  }}
                  value={searchService}
                  className="border rounded-lg border-grey300 py-2.5 px-4"
                />
                <button
                  className="btn-primary flex items-center ml-6"
                  onClick={() => navigate("/create-service")}
                >
                  <div className="text-base font-medium mr-3">เพิ่มบริการ</div>
                  <img src={image.plusSign} alt="Plus Symbol" />
                </button>
              </div>
            </div>
        </header>
    )
}

export default AdminServiceHeader