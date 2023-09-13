import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dateFormat from "../../utils/dateFormat.js";
import AlertBoxDelete from "../AlertBox.jsx";
import image from "../../assets/AdminPhoto/imageIndex.js";
import  useUtils  from "../../hooks/utils.js";

function AdminServiceList(props) {
  const {
    service,
    serviceDeleteAlert,
    deleteService,
    deleteServiceId,
    service_Id,
    setDeleteService,
  } = props;
  
  const { getService } = useUtils();

  const navigate = useNavigate();

  const hide = () => {
    document.getElementById("popUp").style.display = "none";
    setDeleteService(false);
  };

  const handleDelete = () => {
    deleteServiceId(service_Id);
    setDeleteService(false);
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

  useEffect(() => {
    // Call getService when the component mounts
    getService();
  }, [getService]); // Ensure it only runs when getService changes

  return (
    <div className="categories-data min-h-screen bg-bg p-[41px]">
      <div className="ml-60 rounded-[5px] border border-grey200 ">
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
        <table className="bg-white rounded-b-[5px] table-fixed w-full">
          {service.length !== 0 && service[0].service_name !== "" && (
            <tbody className="text-left">
              {service.map((data, index) => (
                <tr className="border-t border-grey200 " key={index}>
                  <td className="font-light text-center">{index + 1}</td>
                  <td className="font-light">{data.service_name}</td>
                  <td className="px-3">
                    <td
                      className={`px-2.5 py-1 rounded-lg text-xs ${getCategoryColor(
                        data.category_id
                      )}`}
                    >
                      {data.category_name}
                    </td>
                  </td>
                  <td className="font-light">
                    {dateFormat(data.service_created_date)} น.
                  </td>
                  <td className="font-light">
                    {dateFormat(data.service_created_date)} น.
                  </td>
                  <td className="h-[88px] flex items-center justify-center">
                  <img
                        className="w-6 h-6 cursor-pointer mx-2"
                        alt="Delete"
                        src={image.trashIcon}
                        onClick={() => {
                          serviceDeleteAlert(data.service_id);
                        }}
                      />
                      <img
                        className="w-6 h-6 cursor-pointer mx-2"
                        alt="Edit"
                        src={image.editIcon}
                        onClick={() =>
                          navigate(`/service/edit/${data.service_id}`)
                        }
                      />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {deleteService ? (
            <AlertBoxDelete
              deleteFunction={handleDelete}
              hideFunction={hide}
              textAlert="ยืนยันการลบรายการ"
              alertQuestion="คุณต้องการลบรายการ ใช่หรือไม่ ?"
              primary="ลบรายการ"
              secondary="ยกเลิก"
            />
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default AdminServiceList;
