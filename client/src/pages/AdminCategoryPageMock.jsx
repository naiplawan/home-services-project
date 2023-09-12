import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/App.css";
import dateFormat from "../utils/dateFormat";
import AdminSidebar from "../components/ServicePage/AdminSidebar.jsx";

function AdminCategoryPageMock() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const deleteCategory = async (categoryId) => {
    if (window.confirm("คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่?")) {
      try {
        setError(null);
        const response = await axios.delete(
          `http://localhost:4000/category/${categoryId}`
        );

        if (response.data.success) {
          // อัปเดตข้อมูลหมวดหมู่โดยเรียก API อีกรอบ
          const updatedCategories = await axios.get(
            `http://localhost:4000/category`
          );

          // อัปเดตข้อมูล UI โดยไม่ต้องรีเฟรชหน้า คือพอเรากดยืนยันที่ alert ข้อมูลก็จะถูกลบทันที
          setData(updatedCategories.data.data);
        } else {
          setError("เกิดข้อผิดพลาดในการลบหมวดหมู่");
        }
      } catch (err) {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    }
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
    <div className=" ">
      <AdminSidebar />
      <div className="  flex flex-col items-center">
        <div className="flex justify-between py-[30px] w-[1080px] px-[50px] text-grey600 mt-[50px]">
          <h1 className="text-grey600 mt-[8px] font-semibold text-[20px]">
            หมวดหมู่
          </h1>
          <div>
            <input
              type="text"
              placeholder="ค้นหาหมวดหมู่..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="px-4 py-2  border rounded focus:outline-none focus:ring focus:border-blue-300 w-[400px] "
            />
            {/* button ตรงนี้น่าจะต้องเป็น  handle ที่ไปหา form add category */}
            <button className=" rounded-lg ml-7 h-[40px] w-[150px] bg-blue600 text-white focus:outline-none focus:ring focus:border-blue-300">
              หมวดหมู่ +
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="results">
          {data.length === 0 ? (
            <p>ไม่พบผลลัพธ์</p>
          ) : (
            <div className="category-list mt-[20px]  px-[100px] mx-[100px]">
              <ul className="">
                {data.data
                  .filter((category) =>
                    category.category_name.includes(keyword)
                  )
                  .map((category) => (
                    <li
                      key={category.category_id}
                      className=" text-grey600 list-none flex justify-between p-[20px] border h-[60px]"
                    >
                      <span className="font-semibold"></span>{" "}
                      {category.category_id}{" "}
                      <span className="font-semibold"></span>{" "}
                      {category.category_name},{" "}
                      <span className="font-semibold"></span>{" "}
                      {dateFormat(category.category_created_date)}
                      <span className="font-semibold"></span>{" "}
                      {dateFormat(category.category_edited_date)}
                      <span className="mx-[20px]">
                        {category.category_id !== categoryToDelete && (
                          <>
                            <button
                              className="ml-2 focus:outline-none focus:ring focus:border-blue-300 rounded-lg"
                              onClick={() =>
                                deleteCategory(category.category_id)
                              }
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEdit(category.category_id)}
                              className="ml-2 focus:outline-none focus:ring focus:border-blue-300 rounded-lg"
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCategoryPageMock;
