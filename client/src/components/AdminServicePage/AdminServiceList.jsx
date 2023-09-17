import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import AlertBoxDelete from "../AlertBox.jsx";
import image from "../../assets/AdminPhoto/imageIndex.js";
import { useUtils } from "../../hooks/utils.js";
import axios from "axios";
import drag from "../../assets/AdminPhoto/drag.svg";
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

function AdminServiceList() {
  const [service, setService] = useState([]);
  const [service_Id, setService_Id] = useState();
  const { setDeleteService, deleteService,} = useUtils();
  const navigate = useNavigate();

  const hide = () => {
    setDeleteService(false);
  };

    // Function to delete a service by ID
    const deleteServiceId = async (serviceId) => {
      await axios.delete(`http://localhost:4000/service/${serviceId}`);
      getService();
      document.getElementById("popUp").style.display = "none";
      navigate("/service-dashboard");
    };

    const categoryServiceAlert = (serviceId) => {
      setService_Id(serviceId);
      setDeleteService(true);
    };

  const handleDelete = (serviceId) => {
    deleteServiceId(serviceId);
    setDeleteService(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // Modified this section to correctly update the 'service' state
    const reorderedServices = [...service.data];
    const [movedService] = reorderedServices.splice(result.source.index, 1);
    reorderedServices.splice(result.destination.index, 0, movedService);

    setService({ data: reorderedServices });

    // บันทึกข้อมูลลำดับใน localStorage
    localStorage.setItem("serviceOrder", JSON.stringify(reorderedServices));
  };

  // Function to map category IDs to background colors
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

  // Function to create a new service
  const getService = async () => {
    try {
      const response = await axios.get("http://localhost:4000/service");
      setService(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Function to set service delete alert
  const serviceDeleteAlert = async (serviceId) => {
    setService_Id(serviceId);
    setDeleteService(true);
  };

  useEffect(() => {
    getService()
    console.log(service);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="services-list mt-10 w-[100%]">
        <ul>
          <li className="flex text-sm text-grey600 list-none p-[20px] rounded-t-lg bg-grey200 border-[1px] border-grey300">
            <span className="text-grey700 mx-[7%] text-center">ลำดับ</span>
            <span className="text-grey700 mx-[1%]">ชื่อบริการ</span>
            <span className="p-3 font-normal">หมวดหมู่</span>
            <span className="text-grey700 mx-[15%]">สร้างเมื่อ</span>
            <span className="text-grey700 mx-[]">แก้ไขล่าสุด</span>
            <span className="text-grey700 mx-[30%] mr-[2%]">{" "}Action</span>
          </li>

          <Droppable droppableId="service-list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {service && service.data &&
                    service.data.map((serviceItem, index) => (
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
                              <img src={drag} className="w-[30px]" />
                            </div>
                            <div className="service-detail cursor-pointer flex justify-between w-[100%] text-black">
            <div
              className={`w-[30%] ml-[2%] ${
                // Optional chaining operator (?.) used here to check if category is not null or undefined
                serviceItem.category?.category_name ? getCategoryColor(serviceItem.category.category_id) : ''
              }`}
            >
              <span className="w-[20%]">{index + 1}</span>
              <span className="w-[30%] ml-[2%]">{serviceItem.service_name}</span>
              {/* Optional chaining operator (?.) used here to check if category is not null or undefined */}
              {serviceItem.category?.category_name}
            </div>
                              <span className="-[50%] ml-[12%]">
                                {dateFormat(serviceItem.service_created_date)}
                              </span>
                              <span className="w-[50%] mr-[16%]">
                                {dateFormat(serviceItem.service_edited_date)}
                              </span>
                            </div>

                            {/* Delete AlertBox */}
                            {serviceItem.service_id !== deleteServiceId && (
                              <div className="pr-[5%] flex">
                                <img
                                  className="cursor-pointer w-[25px] h-[25px] mr-[50%]"
                                  alt="Delete"
                                  src={image.trashIcon}
                                  onClick={() => {
                                    serviceDeleteAlert(serviceItem.service_id);
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
      {deleteService && (
        <AlertBoxDelete
          deleteFunction={handleDelete}
          hideFunction={hide}
          textAlert="ยืนยันการลบรายการ"
          alertQuestion={`คุณต้องการลบรายการ '${
            service.data.find((serviceItem) => serviceItem.service_id === service_Id)
              ?.service_name
          }' ใช่หรือไม่ ?`}
          primary="ลบรายการ"
          secondary="ยกเลิก"
        />
      )}
    </DragDropContext>
  );
}

export default AdminServiceList;
