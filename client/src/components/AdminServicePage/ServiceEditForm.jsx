import { Form, Input, Upload, Select, message, InputNumber, Image } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
// import  {useUtils}  from "../../hooks/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import AdminEditedHeader from "../ServicePage/AdminEditHeader";

function ServiceEditForm() {

  const params = useParams();
  
  const { Dragger } = Upload;
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [editHeader, setEditHeader] = useState("");

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null); //manage the selected image
  const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const [currentData, setCurrentData] = useState({
    service_name: "",
    category_id: "",
    items: [],
  });

  useEffect(() => {
    getServiceId(serviceId);
  }, [serviceId]);

  useEffect(() => {
    if (currentData) {
      form.setFieldValue(currentData);
    }
  }, [currentData]);

  const getServiceId = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      setData(response.data.data);
      setCurrentData(response.data.data[0]);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่:", error);
    }
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleSubmitEdit = async (values) => {
    try {
      const selectedCategoryId = category.data.find(
        (category) => category.category_name === selectedCategory
      )?.category_id;

      const formData = new FormData();
      formData.append("service_name", values.service_name);
      formData.append("category_id", selectedCategoryId);
      formData.append("file", fileList[0]);

      values.items.forEach((item, index) => {
        formData.append(
          "items",
          JSON.stringify({
            sub_service_name: item.name,
            unit: item.unit,
            price_per_unit: item.cost, // Change cost to price_per_unit
          })
        );
      });

      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const response = await axios.put(
        `http://localhost:4000/service/${serviceId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success("Successfully update service");
      } else {
        message.error("Cannot update service");
      }
      navigate("/admin-service");
    } catch (error) {
      console.error(error);
      message.error("Error updating service");
    }
  };

  const getServiceById = async (serviceId) => {
    const result = await axios.get(
      `http://localhost:4000/service/${serviceId}`
    );
    // setService(result.data.data);
    setEditHeader(result.data.data[0].service_name);
  };

  useEffect(() => {
    getServiceById(params.serviceId);
  }, []);

  

  useEffect(() => {
    axios
      .get(`http://localhost:4000/category`)
      .then((response) => {
        setData(response.data.data); // Store data in state
        setCategory(response.data.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(data.data);
  console.log(category);

  // const isImage = (file) => {
  //   const acceptedImageTypes = ['image/jpeg', 'image/png'];
  //   if (!acceptedImageTypes.includes(file.type)) {
  //     return false;
  //   }
  //   return true;
  // };

  const labelStyle = {
    marginTop: "10px",
    color: "var(--gray-900, #323640)",
    fontFamily: "Prompt",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%", // 24px
  };

  return (
    <>
      <Form
        labelCol={{ span: 100 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmitEdit}
        initialValues={currentData} // add initial values
      >
        <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
          <AdminEditedHeader
          title="บริการ"
          name={editHeader}
          back={() => navigate("/admin-service")}>
            <button
              className="btn-secondary w-28 h-11 "
              type="button"
              onClick={() => navigate("/admin-service")}
            >
              ยกเลิก
            </button>
            <button
              className="btn-primary w-28 h-11"
            >
              ยืนยัน
            </button>
          </AdminEditedHeader>
          <div className="bg-white mx-10 mt-10 p-6 border border-grey200 rounded-lg">

          </div>
        </div>
      </Form>
    </>
  );
}

export default ServiceEditForm;
