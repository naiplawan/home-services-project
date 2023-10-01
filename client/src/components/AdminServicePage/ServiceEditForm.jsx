import {
  Form,
  Input,
  Upload,
  Select,
  message,
  InputNumber,
  Image,
  Button,
  Modal,
  Space,
  notification,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../../assets/AdminPhoto/arrow.png";
import dateFormat from "../../utils/dateFormat.js";
import AlertBoxDelete from "../AlertBox.jsx";
import image from "../../assets/AdminPhoto/imageIndex.js";
import { names } from "@ctrl/tinycolor";
import drag from "../../assets/AdminPhoto/drag.svg";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

function ServiceEditForm() {
  //render component and package area
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { Dragger } = Upload;
  


  const handleDragEnd = (result) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }
  
    const updatedSubServices = [...currentSubService];
    const [reorderedItem] = updatedSubServices.splice(result.source.index, 1);
    updatedSubServices.splice(result.destination.index, 0, reorderedItem);
  
    setSubServices(updatedSubServices); // อัพเดต subServices ใหม่
  
    updateSubServiceOrder(updatedSubServices);
  };
  
  
  const updateSubServiceOrder = async (updatedSubServices) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/service/${params.serviceId}/update-sub-service-order`,
        {
          sub_services: updatedSubServices,
        }
      );
  
      if (response.status === 200) {
        message.success("Successfully updated sub_service order");
      } else {
        console.error("Failed to update sub_service order:", response.data);
        message.error("Failed to update sub_service order");
      }
    } catch (error) {
      console.error("Error updating sub_service order:", error);
      message.error("Error updating sub_service order");
    }
  };
  
  
  
  

  //state for category
  const [category, setCategory] = useState([]); //use to map data on category
  const [selectedCategory, setSelectedCategory] = useState(""); //this state store the select category
  const [currentCategory, setCurrentCategory] = useState([]); // the category from serviceID(the data before editng)
  console.log("เปลี่ยนแคท", currentCategory, typeof currentCategory);
  console.log(selectedCategory);

  //state for category to map
  const [data, setData] = useState([]); //use to map category

  //state
  const [service, setService] = useState([]);
  const [subServices, setSubServices] = useState([]);
  //state for name
  const [editableServiceName, setEditableServiceName] = useState(
    service.service_name
  );

  //state for sub_service

  // const [newSubService, setNewSubService] = useState([]);

  // console.log("newSubService", newSubService);

  const currentSubService = service.sub_service; // subservice เดิม

  //state for image
  const [selectedImage, setSelectedImage] = useState(null); //โชว์รูปภาพที่เลือก
  const [fileList, setFileList] = useState([]); //ส่งไปหลังบ้าน
  const [currentImage, setCurrentImage] = useState(""); //รูปที่ fetchมา
  // const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("b", fileList);

  const handleFileChange = (file) => {
    console.log("file", file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
    setFileList([file]);
    return false;
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setCurrentImage(null);
  };

  //delete

  // fetch data area

  console.log(category.data); // array of object

  const [subService, setSubService] = useState([]);


  const getService = async (serviceId) => {
    try {
      const response = await axios.get(`http://localhost:4000/service/${serviceId}`);
      if (response.data.data) { // ตรวจสอบว่า response.data.data ไม่เป็น undefined
        setService(response.data.data);
        setEditableServiceName(response.data.data.service_name);
        setCurrentImage(response.data.data.service_photo);
        setCurrentCategory(response.data.data.category);
        if (response.data.data.service && response.data.data.service.sub_service) {
          setSubService(response.data.data.service.sub_service);
        } else {
          setSubService([]); // หาก sub_service ไม่ถูกกำหนดให้ตั้งค่าเป็นรายการว่าง
        }
        console.log("all data", response.data.data);
      } else {
        console.error("Data is undefined:", response.data);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };
  

 
console.log('service before updating', service)

  // put data API area
  const handleSubmitEdit = async (values) => {
    try {
      console.log("Form values:", values);
  
      const subServiceData = values["service.sub_service"];
  
      const user_id = localStorage.getItem("user_id");
      const selectedCategoryId = category.data.find(
        (category) => category.category_name === selectedCategory
      )?.category_id;
  
      const formData = new FormData();
      formData.append("user_id", user_id);
  
      if (editableServiceName !== service.service_name) {
        formData.append("service_name", editableServiceName);
      }
  
      if (selectedCategoryId !== currentCategory.category_id) {
        formData.append("category_id", selectedCategoryId);
      }
  
      if (fileList[0] && fileList[0] !== currentImage) {
        formData.append("file", fileList[0]);
      }
  
      if (subServiceData) {
        formData.append("items", JSON.stringify(subServiceData));
      }
  
      formData.append("service_created_date", service.service_created_date);
  
      const response = await axios.put(
        `http://localhost:4000/service/${params.serviceId}`,
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
  
  

  // use effect
  // get category to map
  useEffect(() => {
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        // Store data in state
        setCategory(response.data.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);

  useEffect(() => {
    // ในที่นี้คุณสามารถดึงข้อมูล sub-service จากเซิร์ฟเวอร์หรือฐานข้อมูลอื่น ๆ ให้ตรงกับตำแหน่งใหม่
    // และอัพเดตค่า subServices ด้วยข้อมูลใหม่ที่ได้มา
    console.log(subServices);
  }, [subServices]);


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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Form
        labelCol={{ span: 100 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmitEdit}
        initialValues={{
          service_name: editableServiceName,
          category_id: selectedCategory,
          service: {
            // sub_service: [],
            service_photo: currentImage,
          },
        }}
      >
        <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
          <div key={service.service_id}>
            {/* header */}
            <div className="header-detail justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
              <div className="flex gap-[14px] h-12 w-fit">
                <img
                  src={arrow}
                  className=" h-[40px] w-[40px] cursor-pointer hover:scale-110 transition"
                  onClick={() => navigate("/admin-service")}
                />
                <div className="Header-name">
                  <p className="service-text text-xs">บริการ</p>
                  <h1
                    name={service.serviceDetail}
                    className="text-black   font-semibold text-xl"
                  >
                    {service.service_name}
                  </h1>
                </div>
              </div>
              <div className="flex">
                <button
                  className="btn-secondary flex items-center justify-center text-base font-medium w-28 h-11"
                  onClick={() => navigate("/admin-service")}
                >
                  ยกเลิก
                </button>
                <button
                  className="btn-primary flex items-center justify-center ml-6 text-base font-medium w-28 h-11"
                  type="submit"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
            {/* content */}
            <div className="bg-white mx-10 mt-10 p-6 border border-grey200 rounded-lg">
              <Form.Item
                label={<span style={labelStyle}>ชื่อบริการ</span>}
                required
              >
                <Input
                  style={{ width: "50%" }}
                  name="service_name"
                  type="text"
                  value={editableServiceName}
                  onChange={(e) => setEditableServiceName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>หมวดหมู่</span>}
                colon={false}
                required
              >
                <Select
                  value={selectedCategory}
                  style={{ width: "50%" }}
                  name="category_id"
                  onChange={(value) => setSelectedCategory(value)}
                >
                  {category.data &&
                    category.data.map((categoryItem) => (
                      <Select.Option
                        key={categoryItem.category_id}
                        value={categoryItem.category_name}
                      >
                        {categoryItem.category_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>รูปภาพ</span>}
                colon={false}
                required
                className="mb-10"
              >
                {/* {" "} */}
                <div className="w-3/4 h-40 relative">
                  {currentImage && (
                    <div>
                      <img
                        src={currentImage}
                        alt="selected image"
                        style={{ maxWidth: "50%", maxHeight: "100%" }}
                      />
                    </div>
                  )}

                  {!currentImage && (
                    <Upload.Dragger
                      style={{ width: "50%" }}
                      name="file"
                      accept=".png,.jpg,.jpeg"
                      beforeUpload={(file) => {
                        handleFileChange(file);
                        return false; // Prevent default upload behavior
                      }}
                      maxFileSize={5 * 1024 * 1024}
                      showUploadList={false}
                      className="relative"
                    >
                      {selectedImage && (
                        <div>
                          <Image
                            src={selectedImage}
                            alt="uploaded"
                            width={144}
                          />
                        </div>
                      )}
                      <div>
                        {!selectedImage && (
                          <>
                            <InboxOutlined style={{ fontSize: "36px" }} />
                            <p className="ant-upload-text">
                              <span className="text-blue600 text-base not-italic font-semibold underline">
                                อัพโหลดรูปภาพ
                              </span>{" "}
                              หรือ ลากและวางที่นี่
                            </p>
                            <p className="ant-upload-hint">
                              PNG, JPG ขนาดไม่เกิน 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </Upload.Dragger>
                  )}
                  <div
                    className="flex justify-between"
                    style={{ width: "50%" }}
                  >
                    <div className="text-grey700 text-xs z-0 mt-1">
                      ขนาดภาพที่แนะนำ: 1440 x 225 PX
                    </div>
                    <div className=" text-blue500 text-base not-italic font-semibold underline">
                      {" "}
                      <a onClick={handleDeleteImage}>ลบรูปภาพ</a>
                    </div>
                  </div>
                </div>
              </Form.Item>

              <hr className="mt-10 mb-10 text-grey300" />

              {/* {service.sub_service.length > 0 && ( */}
              <div className="mb-10 text-grey700 text-base font-medium">
  รายการบริการย่อย
</div>
<Form.List name="service.sub_service" initialValue={service.sub_service}>
  {(subServices, { add, remove }) => (
    <>
      <Droppable droppableId="subServices">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {subServices.map(({ key, name, ...restField }, index) => (
              <Draggable
                key={index.toString()}
                draggableId={key.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Space
                      key={index.toString()} // เปลี่ยน key เป็น index.toString()
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <div className="w-20 relative">
                        <img
                          src={drag}
                          className="w-15 absolute bottom-[-35px]"
                          alt="Drag"
                        />
                      </div>
                      <Form.Item
                        {...restField}
                        name={[name, "sub_service_name"]}
                        label="ชื่อรายการ"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกชื่อรายการ",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-lg h-11 border border-grey300 mr-4 py-2.5 px-4 focus:border-blue600 focus:outline-none"
                          placeholder="ชื่อรายการ"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price_per_unit"]}
                        label="ค่าบริการ / 1 หน่วย"
                      >
                        <Input
                          type="number"
                          min="0"
                          max="20000"
                          step="any"
                          className="rounded-lg h-11 border border-grey300 mr-4 py-2.5 px-4 focus:border-blue600 focus:outline-none"
                          placeholder="ค่าบริการ / 1 หน่วย"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "unit"]}
                        label="หน่วยการบริการ"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกหน่วยการบริการ",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-lg h-11 border border-grey300 py-2.5 px-4 focus:border-blue600 focus:outline-none mr-4"
                          placeholder="หน่วยการบริการ"
                          name="unit"
                        />
                      </Form.Item>
                      <div
                        style={{
                          flex: "1",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <Form.Item colon={false} label="">
                          <a
                            className=" text-blue600 text-base not-italic font-semibold underline"
                            onClick={() => {
                              if (subServices.length > 1) {
                                remove(name);
                              } else {
                                notification.error({
                                  message: "Error",
                                  description:
                                    "ต้องมีรายการย่อยอย่างน้อย  1 รายการ",
                                  duration: 5,
                                });
                              }
                            }}
                          >
                            ลบรายการ
                          </a>
                        </Form.Item>
                      </div>
                    </Space>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      <button
        className="btn-secondary flex items-center justify-center text-base font-medium w-56 h-11"
        type="button"
        onClick={() => {
          add();
        }}
      >
        + เพิ่มรายการ
      </button>
    </>
  )}
</Form.List>



              <hr className="mt-10 mb-10 text-grey300 "></hr>
              <p className="pb-[25px] ">
                <span className="text-grey700">สร้างเมื่อ</span>
                <span className="px-[200px] text-black ">
                  {dateFormat(service.service_created_date)}
                </span>
              </p>
              <p className="pb-[40px] ">
                <span className="text-grey700">แก้ไขล่าสุด</span>
                <span className="px-[190px] text-black ">
                  {dateFormat(service.service_edited_date)}
                </span>
              </p>
            </div>
          </div>
          <div className="ml-0">
            <img
              className="cursor-pointer w-[25px] h-[25px] mr-[50%]"
              alt="Delete"
              src={image.trashIcon}
            />
            ลบบริการ
          </div>
        </div>
      </Form>
      </DragDropContext>
    </>
  );
}

export default ServiceEditForm;
