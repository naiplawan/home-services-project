import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../styles/App.css";
import dateFormat from "../../utils/dateFormat.js";
import trashIcon from "../../assets/AdminPhoto/trash-icon.png";
import editIcon from "../../assets/AdminPhoto/edit-icon.png";
import plusSign from "../../assets/AdminPhoto/plus-sign.svg";
import AlertBoxDelete from "../AlertBox.jsx";

function AdminCategory() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [category_Id, setCategory_Id] = useState();
  const [deleteCategory, setDeleteCategory] = useState(false);
  const navigate = useNavigate();

  const getCategory = async () => {
    const result = await axios("http://localhost:4000/category");
    setData(result.data.data);
    console.log(result.data.data);
  };

  const deleteCategoryById = async (categoryId) => {
    await axios.delete(`http://localhost:4000/category/${categoryId}`);
    getCategory();
    document.getElementById("popUp").style.display = "none";
    navigate("/admin-category");
  };

  const categoryDeleteAlert = async (categoryId) => {
    setCategory_Id(categoryId);
    console.log(categoryId);
    setDeleteCategory(true);
  };

  const handleDelete = () => {
    deleteCategoryById(category_Id);
    setDeleteCategory(false);
  };

  const hide = () => {
    document.getElementById("popUp").style.display = "none";
    setDeleteCategory(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `http://localhost:4000/category?keyword=${keyword}`
        );

        if (response.data.error) {
          setError("เกิดข้อผิดพลาดในการค้นหา");
        } else {
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    };

    // ให้ fetchData เรียกใช้งานเมื่อ keyword มีการเปลี่ยนแปลง
    fetchData();
  }, [keyword]);

  return (
    <div className="bg-bg h-[100%] pb-[4%] pl-60 ">
      <div className="  flex flex-col items-center  ">
        <div className="header-name justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
          <h1 className="text-black   font-semibold text-xl">หมวดหมู่</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="ค้นหาหมวดหมู่..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="px-4 py-2 border-grey300 border bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-[400px] "
            />

            <button
              alt="add-category"
              className="flex  btn-primary rounded-lg ml-7  h-[100%] w-[190px] text-white focus:outline-none "
              onClick={() => navigate("/admin-category-create")}
            >
              <p className=" pl-[15%]">เพิ่มหมวดหมู่</p>
              <p className="pt-2 pl-[15%]">
                <img src={plusSign} className=" w-[10px] h-[10px] " />
              </p>
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="results w-[95%]">
          {data.length === 0 ? (
            <p></p>
          ) : (
            <div className="category-list mt-10  w-[100%]">
              <ul className="">
                <li className=" flex text-sm text-grey600 list-none p-[20px]  rounded-t-lg bg-grey200 border-[1px] border-grey300">
                  <span className=" text-grey700 mx-[7%]"> ลำดับ</span>
                  <span className=" text-grey700 mx-[1%] "> ชื่อหมวดหมู่ </span>
                  <span className=" text-grey700 mx-[15%]"> สร้างเมื่อ</span>
                  <span className=" text-grey700 mx-[]"> แก้ไขล่าสุด</span>
                  <span className=" text-grey700 mx-[30%] mr-[2%]">
                    {" "}
                    Action
                  </span>
                </li>

                {data.data
                  .filter((category) =>
                    category.category_name.includes(keyword)
                  )
                  .map((category, index) => (
                    <li
                      key={category.category_id}
                      className=" flex hover:bg-grey100 bg-white list-none p-[20px] border-[1px] border-grey200"
                    >
                      <div className="category-detail  cursor-pointer flex justify-between w-[100%] text-black ">
                        <div
                          onClick={() =>
                            navigate(
                              `/admin-category-detail/${category.category_id}`
                            )
                          }
                          className="flex w-[90%] pl-[8%]"
                        >
                          <span className="w-[20%] ">{index + 1}</span>
                          <span className="w-[30%] ml-[2%]">
                            {category.category_name}
                          </span>
                          <span className="w-[50%] ml-[12%] ">
                            {dateFormat(category.category_created_date)}
                          </span>
                          <span className="w-[50%] mr-[16%]">
                            {dateFormat(category.category_edited_date)}
                          </span>
                        </div>
                        {category.category_id !== deleteCategory && (
                          <div className="pr-[5%] flex ">
                            <img
                              className="cursor-pointer w-[25px] h-[25px] mr-[50%] "
                              src={trashIcon}
                              onClick={() =>
                                categoryDeleteAlert(category.category_id)
                              }
                            />
                            <img
                              src={editIcon}
                              className="cursor-pointer w-[25px] h-[25px]  "
                              onClick={() =>
                                navigate(
                                  `/admin-category-edit/${category.category_id}`
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {deleteCategory ? (
            <AlertBoxDelete
              deleteFunction={handleDelete}
              hideFunction={hide}
              textAlert="ยืนยันการลบรายการ"
              alertQuestion={`คุณต้องการลบรายการ '${
                data.data.find((item) => item.category_id === category_Id)
                  ?.category_name
              }' ใช่หรือไม่ ?`}
              primary="ลบรายการ"
              secondary="ยกเลิก"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default AdminCategory;
