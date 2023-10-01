import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dateFormat from "../../utils/dateFormat.js";
import trashIcon from "../../assets/AdminPhoto/trash-icon.png";
import editIcon from "../../assets/AdminPhoto/edit-icon.png";
import plusSign from "../../assets/AdminPhoto/plus-sign.svg";
import AlertBoxDelete from "../AlertBox.jsx";
import drag from "../../assets/AdminPhoto/drag.svg";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

function AdminCategory() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [category_Id, setCategory_Id] = useState();
  const [deleteCategory, setDeleteCategory] = useState(false);
  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const result = await axios("http://localhost:4000/category");
      setData(result.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
    }
  };
  // const getCategory = async () => {
  //   try {
  //     const result = await axios("http://localhost:4000/category");
  //     const sortedData = result.data.data.sort((a, b) => {
  //       const dateA = new Date(a.category_edited_date);
  //       const dateB = new Date(b.category_edited_date);
  //       return dateA - dateB;
  //     });
  //     setData(sortedData);
  //   } catch (error) {
  //     setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
  //   }
  // };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCategories = [...data.data];
    const [movedCategory] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, movedCategory);

    setData({ data: reorderedCategories });

    // บันทึกข้อมูลลำดับใน localStorage
    localStorage.setItem("categoryOrder", JSON.stringify(reorderedCategories));
  };

  const deleteCategoryById = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:4000/category/${categoryId}`);
      getCategory();
      hide();
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการลบหมวดหมู่");
    }
  };

  const categoryDeleteAlert = (categoryId) => {
    setCategory_Id(categoryId);
    setDeleteCategory(true);
  };

  const handleDelete = () => {
    deleteCategoryById(category_Id);
    setDeleteCategory(false);
  };

  const hide = () => {
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
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    };

    fetchData();
  }, [keyword]);

  console.log(data);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-bg h-[100%] pb-[4%] pl-60 min-h-screen">
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
              <p>loading</p>
            ) : (
              <div className="category-list mt-10  w-[100%]">
                <ul>
                  <li className=" flex text-sm text-grey600 list-none p-[20px]  rounded-t-lg bg-grey200 border-[1px] border-grey300">
                    <span className=" text-grey700 mx-[8%]"> ลำดับ</span>
                    <span className=" text-grey700 mx-[%] ">
                      {" "}
                      ชื่อหมวดหมู่{" "}
                    </span>
                    <span className=" text-grey700 mx-[16.4%]">
                      {" "}
                      สร้างเมื่อ
                    </span>
                    <span className=" text-grey700 mx-[-0.5%]">
                      {" "}
                      แก้ไขล่าสุด
                    </span>
                    <span className=" text-grey700 mx-[30%] mr-[1%]">
                      {" "}
                      Action
                    </span>
                  </li>

                  <Droppable droppableId="category-list">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {data &&
                          data.data &&
                          data.data
                            .filter((category) =>
                              category.category_name.includes(keyword)
                            )
                            .map((category, index) => (
                              <Draggable
                                key={category.category_id.toString()}
                                draggableId={category.category_id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className=" flex hover:bg-grey100 bg-white list-none p-[20px] border-[1px] border-grey200"
                                  >
                                    <div className=" flex justify-start items-center">
                                      <img
                                        src={drag}
                                        className="w-[40px]"
                                        alt="Drag"
                                      />
                                    </div>
                                    <div className="category-detail  cursor-pointer flex justify-between w-[100%] text-black ">
                                      <div
                                        onClick={() =>
                                          navigate(
                                            `/admin-category-detail/${category.category_id}`
                                          )
                                        }
                                        className="flex w-[90%] pl-[6%] pt-[1%]"
                                      >
                                        <span className="w-[20%] ">
                                          {index + 1}
                                        </span>
                                        <span className="w-[30%] ml-[2%]">
                                          {category.category_name}
                                        </span>
                                        <span className="w-[50%] ml-[12%] ">
                                          {dateFormat(
                                            category.category_created_date
                                          )}
                                        </span>
                                        <span className="w-[50%] mr-[16%]">
                                          {dateFormat(
                                            category.category_edited_date
                                          )}
                                        </span>
                                      </div>
                                      {category.category_id !==
                                        deleteCategory && (
                                        <div className="pr-[5%] pt-[10px] flex ">
                                          <img
                                            className="cursor-pointer w-[25px] h-[25px] mr-[50%] "
                                            src={trashIcon}
                                            onClick={() =>
                                              categoryDeleteAlert(
                                                category.category_id
                                              )
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
                                )}
                              </Draggable>
                            ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </ul>
              </div>
            )}
            {deleteCategory && (
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
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default AdminCategory;
