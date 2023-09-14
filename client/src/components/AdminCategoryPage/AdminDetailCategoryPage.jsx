import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";

function AdminDetailCategoryPage() {
  const [categoryById, setCategoryById] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const getCategory = async (categoryId) => {
    const results = await axios.get(
      `http://localhost:4000/category/${categoryId}`
    );
    setCategoryById(results.data.data);
    setCategoryDetail(results.data.data[0].category_name);
    console.log(results.data.data);
    console.log(results.data.data[0].category_name);
  };
  useEffect(() => {
    getCategory(params.categoryId);
    console.log(params.categoryId);
  }, []);

  return (
    <div className="bg-grey100 h-[100%] pb-[4%] pl-60 ">
      {categoryById.map((category) => {
        return (
          <>
            <div className="header-detail justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
              <div className="flex">
                <img
                  src={arrow}
                  className=" h-[40px] w-[40px] cursor-pointer hover:scale-110 transition"
                  onClick={() => navigate("/admin-category")}
                />
                <div className="Header-name">
                  <p className="category-text text-xs">หมวดหมู่</p>
                  <h1
                    name={categoryDetail}
                    className="text-black   font-semibold text-xl"
                  >
                    {category.category_name}
                  </h1>
                </div>
              </div>
              <button
                className="btn-primary  h-[100%] w-[112px] p-[20px] text-white focus:outline-none "
                onClick={() =>
                  navigate(`/admin-category-edit/${category.category_id}`)
                }
              >
                แก้ไข
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="detail-container w-[95%] rounded-lg border border-grey300 bg-white font-normal flex-col items-center  px-10 mt-10 pt-[20px] py-[10px] ">
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">ชื่อหมวดหมู่</span>
                  <span className="px-[182px] text-black ">
                    {category.category_name}
                  </span>
                </p>
                <hr className="py-[20px]" />
                <p className="pb-[25px] ">
                  <span className="text-grey700">สร้างเมื่อ</span>
                  <span className="px-[200px] text-black ">
                    {dateFormat(category.category_created_date)}
                  </span>
                </p>
                <p className="pb-[40px] ">
                  <span className="text-grey700">แก้ไขล่าสุด</span>
                  <span className="px-[190px] text-black ">
                    {dateFormat(category.category_edited_date)}
                  </span>
                </p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default AdminDetailCategoryPage;
