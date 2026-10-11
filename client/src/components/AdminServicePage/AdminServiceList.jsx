import { useState, useEffect } from "react";
import { useNavigate } from "@/routing/navigation.jsx";
import dateFormat from "../../utils/dateFormat.js";
import AlertBoxDelete from "../AlertBox.jsx";
import LoadingState from "@/components/ui/loading-state.jsx";
import image from "../../assets/AdminPhoto/imageIndex.js";
import axios from "axios";
import drag from "../../assets/AdminPhoto/drag.svg";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { buttonStyles } from "@/lib/ui-classes.js";

function AdminServiceList() {
  const [keyword, setKeyword] = useState("");
  const [services, setServices] = useState({ data: null });
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const serviceData = services.data;

  const getServices = async () => {
    try {
      const response = await axios.get("/api/service");
      const serviceList = response.data?.data;
      setServices({ data: Array.isArray(serviceList) ? serviceList : [] });
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลบริการ");
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedServices = [...serviceData];
    const [movedService] = reorderedServices.splice(result.source.index, 1);
    reorderedServices.splice(result.destination.index, 0, movedService);

    // อัปเดตลำดับใหม่ใน localStorage
    localStorage.setItem(
      "serviceOrder",
      JSON.stringify(reorderedServices.map((item) => item.service_id))
    );

    // อัปเดต state ด้วยลำดับใหม่
    setServices({ ...services, data: reorderedServices });
  };

  // const hideDeleteServiceAlert = () => {
  //   setDeleteService(false);
  // };

  // const deleteServiceById = async (serviceId) => {
  //   try {
  //     await axios.delete(/api/service/${serviceId});
  //     getServices();
  //     hideDeleteServiceAlert();
  //   } catch (error) {
  //     setError("เกิดข้อผิดพลาดในการลบบริการ");
  //   }
  // };

  // const showDeleteServiceAlert = (serviceId) => {
  //   setServiceIdToDelete(serviceId);
  //   setDeleteService(true);
  // };

  // const handleDelete = () => {
  //   setDeleteService(false);
  // };
  const [service_Id, setService_Id] = useState();

  const deleteCategoryById = async (serviceId) => {
    try {
      await axios.delete(`/api/service/${serviceId}`);
      getServices();
      hide();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบหมวดหมู่:", error);
    }
  };

  const hide = () => {
    setDeleteConfirmation(false);
  };

  const handleDelete = () => {
    deleteCategoryById(service_Id);
    setDeleteConfirmation(false);
  };

  const showDeleteConfirmation = (serviceId) => {
    setService_Id(serviceId);
    setDeleteConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  // const getCategoryColor = (categoryId) => {
  //   switch (categoryId % 5) {
  //     case 0:
  //       return "bg-blue100 text-blue800";
  //     case 1:
  //       return "bg-amber text-brown";
  //     case 2:
  //       return "bg-lime text-green900";
  //     case 3:
  //       return "bg-purple100 text-purple900";
  //     default:
  //       return "bg-pink text-red";
  //   }
  // };

  function getCategoryColor(categoryName) {
    switch (categoryName) {
      case "บริการห้องครัว":
        return "bg-[#ECE6FF] text-[#4512B4]";
      case "บริการห้องน้ำ":
        return "bg-[#DFF9F6] text-[#00596C]";
      default:
        return "bg-[#E7EEFF] text-[#0E3FB0]";
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <header className="bg-bg pl-14 lg:pl-60">
        <div className="flex flex-col items-center">
          <div className="header-name flex min-h-20 flex-col items-stretch justify-between gap-3 border-b border-grey300 bg-white px-4 py-4 text-grey600 sm:px-6 lg:flex-row lg:items-center lg:px-10">
            <h1 className="text-black font-semibold text-xl">บริการ</h1>
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
              <input
                id="search-text"
                name="search-text"
                type="text"
                placeholder="ค้นหาบริการ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-grey300 bg-white px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring sm:w-[400px]"
              />
              <button
                className={`${buttonStyles.primary} flex shrink-0 items-center justify-center sm:w-[190px] lg:ml-7`}
                onClick={() => navigate("/admin-service-create")}
              >
                <p className="pl-[15%]">เพิ่มบริการ</p>
                <p className="pt-2 pl-[15%]">
                  <img
                    src={image.plusSign}
                    alt="Plus Symbol"
                    className="w-[10px] h-[10px]"
                  />
                </p>
              </button>
            </div>
          </div>
        </div>
      </header>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="categories-data min-h-screen min-w-0 bg-bg p-4 sm:p-6 lg:ml-60 lg:p-[41px] ml-14">
        {!Array.isArray(services.data) ? (
          <LoadingState label="กำลังโหลดบริการ" />
        ) : (
          <div className="category-list w-full overflow-x-auto">
            <ul>
              <li className="flex min-w-[960px] list-none gap-[20px] rounded-t-lg border-[1px] border-grey300 bg-grey200 p-[20px] text-sm text-grey600">
                <span className="text-grey700 pl-[7%]">ลำดับ</span>
                <span className="text-grey700 pl-[4%]">ชื่อหมวดบริการ</span>
                <span className="text-grey700 pl-[11%]">หมวดหมู่</span>
                <span className="text-grey700 pl-[12%]">สร้างเมื่อ</span>
                <span className="text-grey700 pl-[17%]">แก้ไขล่าสุด</span>
                <span className="text-grey700 pl-[16%]">Action</span>
              </li>

              <Droppable droppableId="service-list">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {serviceData &&
                      serviceData
                        .filter((serviceItem) =>
                          serviceItem.service_name.includes(keyword)
                        )
                        .map((serviceItem, index) => (
                          <Draggable
                            key={serviceItem.service_id.toString()}
                            draggableId={serviceItem.service_id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex min-w-[960px] list-none border-[1px] border-grey200 bg-white p-[5px] hover:bg-grey100"
                              >
                                <div className="ml-[1%] flex justify-start items-center ">
                                  <img
                                    src={drag}
                                    className="w-[42px]"
                                    alt="Drag"
                                  />
                                </div>
                                <div className="service-detail cursor-pointer flex justify-between w-[100%] text-black h-[88px] items-center">
                                  <div
                                    className="w-[100%]  rounded-lg flex  "
                                    onClick={() =>
                                      navigate(
                                        `/admin-service-detail/${serviceItem.service_id}`
                                      )
                                    }
                                  >
                                    <div className="w-[5%] ml-[13%]">
                                      {index + 1}
                                    </div>
                                    <div className="w-[40%] ml-16 font-light">
                                      {serviceItem.service_name}
                                    </div>
                                    <span
                                      className={`text-center px-[10px] inline-block p-1 rounded-lg ${getCategoryColor(
                                        serviceItem.category.category_name
                                      )} `}
                                    >
                                      {serviceItem.category?.category_name}
                                    </span>
                                  </div>
                                  <span className="w-[50%] ml-[3%]">
                                    {dateFormat(
                                      serviceItem.service_created_date
                                    )}
                                  </span>
                                  <span className="w-[50%]">
                                    {dateFormat(
                                      serviceItem.service_edited_date
                                    )}
                                  </span>
                                </div>

                                {/* Delete */}
                                {serviceItem.service_id !==
                                  deleteConfirmation && (
                                  <div className="pr-[5%] flex h-[88px] items-center justify-center">
                                    <img
                                      className="cursor-pointer w-[25px] h-[25px] mr-[50%]"
                                      alt="Delete"
                                      src={image.trashIcon}
                                      onClick={() =>
                                        showDeleteConfirmation(
                                          serviceItem.service_id
                                        )
                                      }
                                    />
                                    <img
                                      className="cursor-pointer w-[25px] h-[25px]"
                                      alt="Edit"
                                      src={image.editIcon}
                                      onClick={() =>
                                        navigate(
                                          `/admin-service-edit/${serviceItem.service_id}`
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </li>
                            )}
                          </Draggable>
                        ))}
                  </ul>
                )}
              </Droppable>
            </ul>
          </div>
        )}
        {deleteConfirmation && (
          <AlertBoxDelete
            deleteFunction={handleDelete}
            hideFunction={hideDeleteConfirmation}
            textAlert="ยืนยันการลบรายการ"
            alertQuestion={`คุณต้องการลบรายการ '${
              serviceData.find(
                (serviceItem) => serviceItem.service_id === service_Id
              )?.service_name
            }' ใช่หรือไม่ ?`}
            primary="ลบรายการ"
            secondary="ยกเลิก"
          />
        )}
      </div>
    </DragDropContext>
  );
}

export default AdminServiceList;
