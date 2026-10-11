import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@/routing/navigation.jsx";
import { notify } from "@/components/ui/notify.js";
import { buttonStyles } from "@/lib/ui-classes.js";

function CategoryAddForm() {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/category", {
        category_name: categoryName,
      });

      if (response.status === 201) {
        setCategoryName("");
        notify.success("สร้าง category สำเร็จ!");
        navigate("/admin-category");
      }
    } catch {
      notify.error("สร้างหมวดหมู่ไม่สำเร็จ");
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    navigate("/admin-category");
  };

  return (
    <div className="min-h-screen pl-16 lg:pl-60">
      <form onSubmit={handleSubmit}>
        <div
          className="header-name flex min-h-20 items-center justify-between gap-3 border-b border-grey300 bg-white px-4 py-4 sm:px-6 lg:px-10"
        >
          <h1 className="text-xl font-medium">เพิ่มหมวดหมู่</h1>
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
              สร้าง
            </button>
          </div>
        </div>
        <div
            className="createCategory mx-4 my-6 flex min-h-32 flex-col items-stretch justify-center gap-3 rounded-lg border border-grey200 bg-white px-4 py-6 sm:mx-10 sm:my-10 sm:flex-row sm:items-center sm:gap-0 sm:px-6 sm:py-0 lg:pr-[434px]"
        >
          <div
            className="inputForCreate 
            flex justify-between items-center h-11 w-full"
          >
            <label className="h-6 text-grey700">
              ชื่อหมวดหมู่<span className="text-red">*</span>
            </label>
            <input
              required
              id="categoryName"
              name="categoryName"
              type="text"
              className="h-11 w-full rounded-lg border border-grey300 bg-white px-4 py-2.5 focus:border-blue600 focus:outline-none sm:w-8/12"
              value={categoryName}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CategoryAddForm;
