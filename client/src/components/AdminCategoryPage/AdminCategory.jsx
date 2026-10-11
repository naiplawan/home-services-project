import { useState, useEffect } from "react";
import { useNavigate } from "@/routing/navigation.jsx";
import axios from "axios";
import dateFormat from "../../utils/dateFormat.js";
import trashIcon from "../../assets/AdminPhoto/trash-icon.png";
import editIcon from "../../assets/AdminPhoto/edit-icon.png";
import assetUrl from "../../assets/assetUrl.js";
import plusSign from "../../assets/AdminPhoto/plus-sign.svg";
import AlertBoxDelete from "../AlertBox.jsx";
import LoadingState from "@/components/ui/loading-state.jsx";
import { buttonStyles } from "@/lib/ui-classes.js";
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
      const result = await axios("/api/category");
      setData(result.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่");
    }
  };
  // const getCategory = async () => {
  //   try {
  //     const result = await axios("/api/category");
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
      await axios.delete(`/api/category/${categoryId}`);
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
          `/api/category?keyword=${keyword}`
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
      <div className="min-h-screen bg-bg pb-[4%] pl-16 lg:pl-60">
        <div className="  flex flex-col items-center  ">
          <div className="header-name flex min-h-20 items-center justify-between gap-4 border-b border-grey300 bg-white px-4 py-4 text-grey600 sm:px-6 lg:px-10">
            <h1 className="text-black   font-semibold text-xl">หมวดหมู่</h1>
            <div className="flex min-w-0 flex-1 justify-end gap-3 sm:flex-none">
              <input
                type="text"
                placeholder="ค้นหาหมวดหมู่..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-grey300 bg-white px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring sm:w-[400px]"
              />

              <button
                alt="add-category"
                className={`${buttonStyles.primary} flex shrink-0 items-center justify-center sm:w-[190px]`}
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
          <div className="results w-[95%] min-w-0">
            {data.length === 0 ? (
              <LoadingState label="กำลังโหลดหมวดหมู่" />
            ) : (
              <div className="category-list mt-10 w-full overflow-x-auto">
                <ul>
                  <li className="flex min-w-[900px] list-none rounded-t-lg border-[1px] border-grey300 bg-grey200 p-[20px] text-sm text-grey600">
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
                                    className="flex min-w-[900px] list-none border-[1px] border-grey200 bg-white p-[20px] hover:bg-grey100"
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
                                            src={assetUrl(trashIcon)}
                                            onClick={() =>
                                              categoryDeleteAlert(
                                                category.category_id
                                              )
                                            }
                                          />
                                          <img
                                            src={assetUrl(editIcon)}
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
