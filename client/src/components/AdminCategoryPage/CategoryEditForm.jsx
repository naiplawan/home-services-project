import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";
import trash from "../../assets/homepagePhoto/trash.svg";

function EditedCategoryForm() {
  const [categoryById, setCategoryById] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState("");
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่ต้องการลบหมวดหมู่นี้?")) {
      try {
        setIsError(false);
        setIsLoading(true);
  
        const response = await axios.delete(`http://localhost:4000/category/${categoryId}`);
  
        setIsLoading(false);
        if (response.status === 200) {
          alert("ลบหมวดหมู่สำเร็จ");
          navigate("/admin-category");
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("เกิดข้อผิดพลาดในการลบหมวดหมู่:", error);
      }
    }
  };

  const handleCancel = () => {
    setCategoryName(""); 
    navigate("/admin-category");
  };

  const params = useParams();
  const categoryId = params.categoryId;
  const getCategory = async (categoryId) => {
    const results = await axios.get(
      `http://localhost:4000/category/${categoryId}`
    );
    setCategoryById(results.data.data);
    setCategoryEdit(results.data.data[0].category_name);
    console.log(results.data.data);
    console.log(results.data.data[0].category_name);
  };
  useEffect(() => {
    getCategory(categoryId); // เรียกใช้งาน getCategory ด้วย categoryId
}, [categoryId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await axios.put(`http://localhost:4000/category/${categoryId}`, {
        category_name: editedCategoryName,
        category_edited_date: new Date()
      });

      setIsLoading(false);
      if (response.status === 200) {
        setCategoryName(editedCategoryName);
        alert("success")
        navigate("/admin-category");
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);

    }
  };

  return (
    <div className="edit-container h-screen bg-bg pl-60">
      <form onSubmit={handleSubmit}>
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
                    name={categoryEdit}
                    className="text-black   font-semibold text-xl"
                  >
                    {category.category_name}
                  </h1>
                </div>
              </div>
              <div
        className="header-name flex items-center h-20 px-10
         justify-between border-b border-grey300 bg-white"
      >
        <div className="flex">
          <button
            className="btn-secondary flex items-center
               justify-center text-base font-medium w-28 h-11"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
          <button
            className="btn-primary flex items-center justify-center
               ml-6 text-base font-medium w-28 h-11"
            type="submit" onClick={() => navigate("/admin-category")}
          >
            ยืนยัน
          </button>
        </div>
      </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="detail-container w-[95%] rounded-lg border border-grey300 bg-white font-normal flex-col items-center  px-10 mt-10 pt-[20px] py-[10px] ">
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">ชื่อหมวดหมู่</span>
                  <input
                className="rounded-lg border ml-16 px-4 h-11 w-4/6 border-grey300 focus:border-blue600 focus:outline-none"
                type="text"
                name="edited_category"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
              />
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
      </form>
      <div className="flex justify-end mr-12 mt-10 text-[#80899C] underline cursor-pointer" onClick={handleDelete}><img src={trash}/> ลบหมวดหมู่</div>
    </div>
  );
}

export default EditedCategoryForm;
