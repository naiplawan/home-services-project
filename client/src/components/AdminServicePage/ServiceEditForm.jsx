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


function ServiceEditForm() {
  //render component and package area
  const navigate = useNavigate();
  const params = useParams();
  const { Dragger } = Upload;

  //delete state
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  //state for category
  const [category, setCategory] = useState([]); //use to map data on category
  const [selectedCategory, setSelectedCategory] = useState(""); //this state store the select category
  const [currentCategory, setCurrentCategory] = useState([]); // the category from serviceID(the data before editng)
  console.log("เปลี่ยนแคท", currentCategory, typeof currentCategory);
  console.log(selectedCategory);

  //state for category to map
  const [data, setData] = useState([]); //use to map category

  //state for sub_category
  const [service, setService] = useState([]);

  //state for name
  const [editableServiceName, setEditableServiceName] = useState(
    service.service_name
  );

  console.log("เปลี่ยนชื่อ", editableServiceName, typeof editableServiceName);
  //state for sub_service

  const subServiceArray = service.sub_service;

  //state for image
  const [selectedImage, setSelectedImage] = useState(null); //โชว์รูปภาพที่เลือก
  const [fileList, setFileList] = useState([]); //ส่งไปหลังบ้าน
  const [currentImage, setCurrentImage] = useState(""); //รูปที่ fetchมา
  // const [isModalVisible, setIsModalVisible] = useState(false);

  console.log("a", selectedImage);
  console.log("b", fileList);
  console.log("c", currentImage);

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

  // const deleteCategoryById = async (serviceId) => {
  //   try {
  //     await axios.delete(`http://localhost:4000/service/${serviceId}`);
  //     getServices();
  //     hide();
  //   } catch (error) {
  //     console.error("เกิดข้อผิดพลาดในการลบหมวดหมู่:", error);
  //   }
  // };

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

  // const handleInputChange = (e) => {
  //   const { key, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [key]: value,
  //   });
  // };

  // function area

  // fetch data area

  console.log(category.data); // array of object

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      setService(response.data.data);
      setEditableServiceName(response.data.data.service_name);
      setCurrentImage(response.data.data.service_photo);
      setCurrentCategory(response.data.data.category);
      console.log("what is this", response.data.data);
      // setSelectedImage(response.data.image_url);
      // setFileList([
      //   {
      //     uid: "-1",
      //     name: "image.png",
      //     status: "done",
      //     url: response.data.image_url,
      //   },
      // ]);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  console.log(currentImage);

  // put data API area
  const handleSubmitEdit = async (values) => {
    try {
      const updatedSubServiceArray = values.service.sub_service;

      // const user_id = localStorage.getItem('user_id');

      const selectedCategoryId = category.data.find(
        (category) => category.category_name === selectedCategory
      )?.category_id;

      console.log("อายดี", selectedCategoryId);
      console.log("ฟายลิส", fileList);

      const formData = new FormData();
      // formData.append('user_id', user_id);
      console.log("อีดิทเทเบิล", editableServiceName);
      formData.append("service_name", editableServiceName);

      formData.append("category_id", selectedCategoryId);
      formData.append("file", fileList);

      console.log(updatedSubServiceArray);

      updatedSubServiceArray.forEach((item, index) => {
        const subServiceData = {
          sub_service_name: item.sub_service_name,
          unit: item.unit,
          price_per_unit: item.price_per_unit,
        };

        formData.append(
          `service.sub_service[${index}]`,
          JSON.stringify(subServiceData)
        );
      });

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

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
        initialValues={{
          service_name: editableServiceName,
          category_id: selectedCategory,
          service: {
            sub_service:
              service.sub_service &&
              subServiceArray.map((subService, index) => ({
                sub_service_name: subService.sub_service_name,
                price_per_unit: subService.price_per_unit,
                unit: subService.unit,
                key: index,
              })),
            service_photo: currentImage,
          },
        }}
      >
        <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
          {/* header */}
          <div key={service.service_id}>
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
                rules={[
                  {
                    required: true,
                    message: "โปรดกรอกชื่อบริการ",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "โปรดเลือกหมวดหมู่",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "โปรดเลือกรูปภาพ",
                  },
                ]}
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
                      rules={[
                        {
                          required: true,
                          message: "เลือกรูปภาพ",
                        },
                      ]}
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
              <div className="mb-10 text-grey700 text-base font-medium ">
                รายการบริการย่อย
              </div>
              <Form.List
                name="service.sub_service"
                initialValue={subServiceArray}
              >
                {(subServices, { add, remove }) => (
                  <>
                    {service.sub_service &&
                      subServices.map(
                        ({ key, name, fieldKey, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
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
                              initialValue={
                                subServiceArray[key]?.sub_service_name
                              }
                            >
                              <Input
                                className="rounded-lg h-11 border border-grey300 mr-4 py-2.5 px-4 focus:border-blue600 focus:outline-none"
                                placeholder="ชื่อรายการ"
                                name="sub_service_name"
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "price_per_unit"]}
                              label="ค่าบริการ / 1 หน่วย"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกค่าบริการ / 1 หน่วย",
                                },
                                {
                                  message: "กรุณากรอกตัวเลข",
                                },
                              ]}
                              initialValue={
                                subServiceArray[key]?.price_per_unit
                              }
                            >
                              <Input
                                type="number"
                                min="0"
                                max="20000"
                                step="any"
                                className="rounded-lg h-11 border border-grey300 mr-4 py-2.5 px-4 focus:border-blue600 focus:outline-none"
                                placeholder="ค่าบริการ / 1 หน่วย"
                                name="price_per_unit"
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
                              initialValue={subServiceArray[key]?.unit}
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
                                        duration: 5, // Set duration (in seconds)
                                      });
                                    }
                                  }}
                                >
                                  ลบรายการ
                                </a>
                              </Form.Item>
                            </div>
                          </Space>
                        )
                      )}
                    <button
                      className="btn-secondary flex items-center justify-center text-base font-medium w-56 h-11"
                      type="button"
                      onClick={() => add()}
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
              onClick={() => showDeleteConfirmation(service.service_id)}
            />
            ลบบริการ
          </div>
        </div>
      </Form>
    </>
  );
}

export default ServiceEditForm;
