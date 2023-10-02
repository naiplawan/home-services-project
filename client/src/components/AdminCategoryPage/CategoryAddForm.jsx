import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function CategoryAddForm() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await axios.post("http://localhost:4000/category", {
        category_name: categoryName,
      });

      setIsLoading(false);
      if (response.status === 201) {
        setCategoryName("");
        message.success("สร้าง category สำเร็จ!");
        navigate("/admin-category");
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    navigate("/admin-category");
  };

  return (
    <div className="pl-60">
      <form onSubmit={handleSubmit}>
        <div
          className="header-name flex items-center h-20 px-10
         justify-between border-b border-grey300 bg-white"
        >
          <h1 className="text-xl font-medium">เพิ่มหมวดหมู่</h1>
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
              type="submit"
            >
              สร้าง
            </button>
          </div>
        </div>
        <div
          className="createCategory 
          bg-white border border-grey200
           flex items-center justify-start rounded-lg h-32 mx-10 my-10 py-0 pl-6 pr-[434px]"
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
              className="border rounded-lg border-grey300 bg-white
              focus:border-blue600 focus:outline-none w-8/12 h-11 py-2.5 px-4"
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
