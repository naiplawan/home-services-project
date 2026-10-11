import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "@/routing/navigation.jsx";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";
import assetUrl from "../../assets/assetUrl.js";
import { buttonStyles } from "@/lib/ui-classes.js";

function AdminDetailCategoryPage() {
  const [categoryById, setCategoryById] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const getCategory = async (categoryId) => {
    const results = await axios.get(
      `/api/category/${categoryId}`
    );
    setCategoryById(results.data.data);
    setCategoryDetail(results.data.data[0].category_name);
    console.log(results.data.data);
    console.log(results.data.data[0].category_name);
  };
  useEffect(() => {
    getCategory(params.categoryId);
    console.log(params.categoryId);
  }, [params.categoryId]);

  return (
    <div className="min-h-screen bg-grey100 pb-[4%] pl-16 lg:pl-60">
      {categoryById.map((category) => {
        return (
          <>
            <div className="header-detail flex min-h-20 items-center justify-between gap-3 border-b border-grey300 bg-white px-4 py-4 text-grey600 sm:px-6 lg:px-10">
              <div className="flex">
                <img
                  src={assetUrl(arrow)}
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
                className={`${buttonStyles.primary} h-10 w-28 p-2.5`}
                onClick={() =>
                  navigate(`/admin-category-edit/${category.category_id}`)
                }
              >
                แก้ไข
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="detail-container mt-6 flex w-[95%] flex-col items-start rounded-lg border border-grey300 bg-white px-4 py-5 font-normal sm:mt-10 sm:px-10">
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">ชื่อหมวดหมู่</span>
                  <span className="break-words px-2 text-black sm:px-4 lg:px-[182px]">
                    {category.category_name}
                  </span>
                </p>
                <hr className="py-[20px]" />
                <p className="pb-[25px] ">
                  <span className="text-grey700">สร้างเมื่อ</span>
                  <span className="px-2 text-black sm:px-4 lg:px-[200px]">
                    {dateFormat(category.category_created_date)}
                  </span>
                </p>
                <p className="pb-[40px] ">
                  <span className="text-grey700">แก้ไขล่าสุด</span>
                  <span className="px-2 text-black sm:px-4 lg:px-[190px]">
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
