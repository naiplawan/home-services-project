import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import AlertBoxDelete from "../AlertBox.jsx";
import image from "../../assets/AdminPhoto/imageIndex.js";
import axios from "axios";
import drag from "../../assets/AdminPhoto/drag.svg";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

function AdminServiceList() {
  const [keyword, setKeyword] = useState("");
  const [service, setServices] = useState([]);
  const [serviceIdToDelete, setServiceIdToDelete] = useState(null);
  const [deleteService, setDeleteService] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:4000/service");
      setServices(response.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลบริการ");
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `http://localhost:4000/service?keyword=${keyword}`
        );

        if (response.data.error) {
          setError("เกิดข้อผิดพลาดในการค้นหา");
        } else {
          setServices(response.data.data);
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    };

    fetchData();
  }, [keyword]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedServices = [...service];
    const [movedService] = reorderedServices.splice(result.source.index, 1);
    reorderedServices.splice(result.destination.index, 0, movedService);

    setServices(reorderedServices);

    // Save the order in localStorage
    localStorage.setItem("serviceOrder", JSON.stringify(reorderedServices));
  };

  const hideDeleteServiceAlert = () => {
    setDeleteService(false);
  };

  const deleteServiceById = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:4000/service/${serviceId}`);
      getServices();
      hideDeleteServiceAlert();
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการลบบริการ");
    }
  };

  const showDeleteServiceAlert = (serviceId) => {
    setServiceIdToDelete(serviceId);
    setDeleteService(true);
  };

  const handleDelete = () => {
    deleteServiceById(serviceIdToDelete);
  };

  const getCategoryColor = (categoryId) => {
    switch (categoryId % 5) {
      case 0:
        return "bg-blue100 text-blue800";
      case 1:
        return "bg-amber text-brown";
      case 2:
        return "bg-lime text-green900";
      case 3:
        return "bg-purple100 text-purple900";
      default:
        return "bg-pink text-red";
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <header className="bg-bg h-[100%] pb-[4%] pl-60">
        <div className="flex flex-col items-center">
          <div className="header-name justify-between flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white text-grey600 pb-[20px] border-b border-grey300">
            <h1 className="text-black font-semibold text-xl">บริการ</h1>
            <div className="flex">
              <input
                id="search-text"
                name="search-text"
                type="text"
                placeholder="ค้นหาบริการ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="px-4 py-2 border-grey300 border bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-[400px]"
              />
              <button
                className="flex btn-primary rounded-lg ml-7 h-[100%] w-[190px] text-white focus:outline-none"
                onClick={() => navigate("/admin-service-create")}
              >
                <p className="pl-[15%]">เพิ่มบริการ</p>
                <p className="pt-2 pl-[15%]">
                  <img src={image.plusSign} alt="Plus Symbol" className="w-[10px] h-[10px]" />
                </p>
              </button>
            </div>
          </div>
        </div>
      </header>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="results w-[95%]">
        {service.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="category-li
         st mt-10 w-[100%]">
            <ul>
              <li className="flex text-sm text-grey600 list-none p-[20px] rounded-t-lg bg-grey200 border-[1px] border-grey300">
                <span className="text-grey700 mx-[7%]">ลำดับ</span>
                <span className="text-grey700 mx-[1%]">ชื่อหมวดบริการ</span>
                <span className="p-3 font-normal">หมวดหมู่</span>
                <span className="text-grey700 mx-[15%]">สร้างเมื่อ</span>
                <span className="text-grey700 mx-[]">แก้ไขล่าสุด</span>
                <span className="text-grey700 mx-[30%] mr-[2%]">Action</span>
              </li>

              <Droppable droppableId="service-list">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {service &&
                      service.data &&
                      service.data
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
                              className="flex hover:bg-grey100 bg-white list-none p-[20px] border-[1px] border-grey200"
                            >
                              <div>
                                <img src={drag} className="w-[30px]" alt="Drag" />
                              </div>
                              <div className="service-detail cursor-pointer flex justify-between w-[100%] text-black h-[88px] items-center">
                                <div
                                  className={`w-[100%] ml-2% rounded-lg justify-center flex ${
                                    serviceItem.category?.category_name
                                      ? getCategoryColor(
                                          serviceItem.category.category_id
                                        )
                                      : ""
                                  }`}
                                  onClick={() =>
                                    navigate(
                                      `/admin-service-detail/${serviceItem.service_id}`
                                    )
                                  }
                                >
                                  <div className="w-[20%]">{index + 1}</div>
                                  <div className="w-[30%] ml-[2%] font-light">
                                    {serviceItem.service_name}
                                  </div>
                                  <span>{serviceItem.category?.category_name}</span>
                                </div>
                                <span className="-[50%] ml-[12%]">
                                  {dateFormat(serviceItem.service_created_date)}
                                </span>
                                <span className="w-[50%] mr-[10%]">
                                  {dateFormat(serviceItem.service_edited_date)}
                                </span>
                              </div>

                              {/* Delete */}
                              {serviceItem.service_id !== serviceIdToDelete && (
                                <div className="pr-[5%] flex h-[88px] items-center justify-center">
                                  <img
                                    className="cursor-pointer w-[25px] h-[25px] mr-[50%]"
                                    alt="Delete"
                                    src={image.trashIcon}
                                    onClick={() => {
                                      showDeleteServiceAlert(serviceItem.service_id);
                                    }}
                                  />
                                  <img
                                    className="cursor-pointer w-[25px] h-[25px]"
                                    alt="Edit"
                                    src={image.editIcon}
                                    onClick={() =>
                                      navigate(`/service/edit/${serviceItem.service_id}`)
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
        {deleteService && (
          <AlertBoxDelete
            deleteFunction={handleDelete}
            hideFunction={hideDeleteServiceAlert}
            textAlert="ยืนยันการลบรายการ"
            alertQuestion={`คุณต้องการลบรายการ '${
              service.find((serviceItem) => serviceItem.service_id === serviceIdToDelete)?.service_name
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