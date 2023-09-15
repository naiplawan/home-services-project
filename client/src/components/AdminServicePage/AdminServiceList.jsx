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
  const {
    setDeleteService,
    deleteService,
    deleteServiceId,
    setDeleteCategory,
  } = useUtils();

  const navigate = useNavigate();

  const hide = () => {
    document.getElementById("popUp").style.display = "none";
    setDeleteCategory(false);
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
    getService();
  }, []);

  return (
    <div className="services-list mt-10  w-[100%]">
      <div className="ml-60 rounded-[5px] border border-grey200">
        <table className="table-fixed w-full text-left">
          <thead className="bg-grey100 text-grey700 text-sm">
            <tr>
              <th className="py-3 font-normal text-center">ลำดับ</th>
              <th className="py-3 font-normal">ชื่อบริการ</th>
              <th className="p-3 font-normal">หมวดหมู่</th>
              <th className="py-3 font-normal">สร้างเมื่อ</th>
              <th className="py-3 font-normal">แก้ไขล่าสุด</th>
              <th className="py-3 font-normal text-center">Action</th>
            </tr>
          </thead>
        </table>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="service-list">
            {(provided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white rounded-b-[5px] table-fixed w-full"
              >
                <tbody className="text-left">
                  {service && service.data &&
                    service.data.map((serviceItem, index) => (
                      <Draggable
                        key={serviceItem.service_id.toString()}
                        draggableId={serviceItem.service_id.toString()} 
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="border-t border-grey200"
                            key={index}
                          >
                            <td>
                              <div>
                                <img src={drag} className="w-[30px]" />
                              </div>
                            </td>
                            <td className="font-light text-center">{index + 1}</td>
                            <td className="font-light">{serviceItem.service_name}</td>
                            <td className="px-3">
                              <td
                                className={`px-2.5 py-1 rounded-lg text-xs ${getCategoryColor(
                                  serviceItem.category_id
                                )}`}
                              >
                                {serviceItem.category.category_name}
                              </td>
                            </td>
                            <td className="font-light">
                              {dateFormat(serviceItem.service_created_date)} 
                            </td>
                            <td className="font-light">
                              {dateFormat(serviceItem.service_edited_date)} 
                            </td>
                            <td className="h-[88px] flex items-center justify-center">
                              <img
                                className="w-6 h-6 cursor-pointer mx-2"
                                alt="Delete"
                                src={image.trashIcon}
                                onClick={() => {
                                  serviceDeleteAlert(serviceItem.service_id)
                                }}
                              />
                              <img
                                className="w-6 h-6 cursor-pointer mx-2"
                                alt="Edit"
                                src={image.editIcon}
                                onClick={() =>
                                  navigate(`/service/edit/${serviceItem.service_id}`)
                                }
                              />
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
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
        )
        } 
      </div>  
    </div>
  );
}


export default AdminServiceList;
