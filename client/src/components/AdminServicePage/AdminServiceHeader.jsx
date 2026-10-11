import { useEffect, useState } from "react";
import { useNavigate } from "@/routing/navigation.jsx";
import axios from "axios";
import image from "../../assets/AdminPhoto/imageIndex";
import { buttonStyles } from "@/lib/ui-classes.js";

const AdminServiceHeader = () => {
    const navigate = useNavigate();
    const [searchService, setSearchService] = useState("");

    useEffect(() => {
      const timerId = setTimeout(() => {
        axios.get(`/api/service?keywords=${searchService}`);
      }, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }, [searchService]);

    return (
      <header className="sticky top-0 bg-white">
      <div className="flex min-h-20 flex-col items-stretch justify-between gap-3 border-b border-grey300 bg-white px-4 py-3 sm:px-6 lg:ml-60 lg:flex-row lg:items-center lg:py-0 lg:pr-10">
        <h1 className="text-xl font-medium text-black lg:pl-10">บริการ</h1>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
          <input
            id="search-text"
            name="search-text"
            type="text"
            placeholder="ค้นหาบริการ..."
            value={searchService}
            onChange={(event) => {
              setSearchService(event.target.value);
            }}
            className="w-full min-w-0 rounded-lg border border-grey300 bg-white px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring sm:w-[400px]"
          />
          <button
            className={`${buttonStyles.primary} flex shrink-0 items-center justify-center sm:ml-2`}
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
