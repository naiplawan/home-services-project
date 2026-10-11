import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "@/routing/navigation.jsx";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";
import assetUrl from "../../assets/assetUrl.js";
import trash from "../../assets/homepagePhoto/trash.svg";
import AlertBoxDelete from "../AlertBox.jsx";
import { notify } from "@/components/ui/notify.js";
import { buttonStyles } from "@/lib/ui-classes.js";

function EditedCategoryForm() {
  const [categoryData, setCategoryData] = useState([]);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);

  const getCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `/api/category/${categoryId}`
      );
      setCategoryData(response.data.data);
      setEditedCategoryName(response.data.data[0].category_name);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่:", error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `/api/category/${categoryId}`,
        {
          category_name: editedCategoryName,
          category_edited_date: new Date(),
        }
      );
      if (response.status === 200) {
      notify.success("แก้ไขหมวดหมู่สำเร็จ");
        navigate("/admin-category");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/category/${categoryId}`);
      notify.success("ลบหมวดหมู่สำเร็จ");
      navigate("/admin-category");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบหมวดหมู่:", error);
    }
  };

  const showDeleteConfirmation = () => {
    setDeleteConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  const handleCancel = () => {
    setEditedCategoryName("");
    navigate("/admin-category");
  };
  return (
    <div className="edit-container min-h-screen bg-bg pl-16 lg:pl-60">
      {categoryData.map((category) => (
        <form onSubmit={handleEditSubmit} key={category.category_id}>
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
                  name={category.category_name}
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
                  className={`${buttonStyles.secondary} flex h-11 w-28 items-center justify-center`}
                  onClick={handleCancel}
                >
                  ยกเลิก
                </button>
                <button
                  className={`${buttonStyles.primary} flex h-11 w-28 items-center justify-center sm:ml-3`}
                  type="submit"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
              <div className="detail-container mt-6 flex w-[95%] flex-col items-start rounded-lg border border-grey300 bg-white px-4 py-5 font-normal sm:mt-10 sm:px-10">
              <p className="pb-[40px] pt-[20px] ">
                <span className="text-grey700">ชื่อหมวดหมู่</span>
                <input
                  className="w-full rounded-lg border border-grey300 bg-white px-4 text-black focus:border-blue600 focus:outline-none sm:ml-4 sm:h-11 sm:w-4/6 lg:ml-16"
                  type="text"
                  name="edited_category"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
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
          <div
            className="flex justify-end mr-12 mt-10 text-[#80899C] underline cursor-pointer"
            onClick={showDeleteConfirmation}
          >
            <img
              className="cursor-pointer w-[25px] h-[25px]  "
              src={trash}
              alt="Delete"
            />{" "}
            ลบหมวดหมู่
          </div>
        </form>
      ))}

      {deleteConfirmation && (
        <AlertBoxDelete
          deleteFunction={handleDelete}
          hideFunction={hideDeleteConfirmation}
          textAlert="ยืนยันการลบรายการ"
          alertQuestion={`คุณต้องการลบรายการ '${categoryData[0]?.category_name}' ใช่หรือไม่ ?`}
          primary="ลบรายการ"
          secondary="ยกเลิก"
        />
      )}
    </div>
  );
}

export default EditedCategoryForm;
