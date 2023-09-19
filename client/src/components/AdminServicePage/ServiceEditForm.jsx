import {
    Form,
    Input,
    Upload,
    Select,
    message,
    InputNumber,
    Image,
  } from "antd";
  import {
    InboxOutlined,
  } from "@ant-design/icons";
  import { useNavigate } from "react-router-dom";
  // import  {useUtils}  from "../../hooks/utils";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { useParams } from "react-router-dom";
  import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
  
  function ServiceEditForm() {
    const { Dragger } = Upload;
    const navigate = useNavigate();
    const { serviceId } = useParams();
  
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
  
    const [selectedImage, setSelectedImage] = useState(null); //manage the selected image
    const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");
    const [fileList, setFileList] = useState([]);
    
    const [currentData, setCurrentData] = useState({
      service_name: "",
      category_id: "",
      items: [],
    });
  
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
  
    const handleSubmitService = async (values) => {
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
        navigate("/admin-service")
  
      } catch (error) {
        console.error(error);
        message.error("Error updateing service");
      }
    };
  
    // เพิ่ม ถ้าสร้างเสร็จให้ navigate ไปหน้า admin dashboard
  
    useEffect(() => {
      axios
        .get(`http://localhost:4000/category`)
        .then((response) => {
          const currentService = response.data.data
          setCurrentData(currentService);
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [serviceId]);
  
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
          onFinish={handleSubmitService}
          initialValues={currentData} // add initial values
        >
          <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
            <div className="flex items-center h-20 px-10 justify-between border-b border-grey300 bg-white">
            <div className="Header-name">
              <p className="service-text text-xs">บริการ</p>
              <h1
                className="text-black   font-semibold text-xl"
              >
                ล้างแอร์
              </h1>
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
            <div className="bg-white m-10 rounded p-4 w-full max-w-[1120px] mx-auto">
              {/* flex flex-col items-start  */}
  
              <Form.Item
                label={<span style={labelStyle}>ชื่อบริการ</span>}
                colon={false}
                rules={[
                  {
                    required: true,
                    message: "โปรดกรอกชื่อบริการ",
                  },
                ]}
                name="service_name"
              >
                <Input style={{ width: "50%" }} required />
              </Form.Item>
  
              <Form.Item
                label={<span style={labelStyle}>หมวดหมู่</span>}
                colon={false}
              >
                <Select
                  value={selectedCategory}
                  style={{ width: "50%" }}
                  onChange={(value) => setSelectedCategory(value)}
                >
                  {data &&
                    data.data &&
                    data.data.map((categoryItem) => (
                      <Select.Option
                        key={categoryItem.category_id}
                        value={categoryItem.category_name}
                      >
                        {categoryItem.category_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <div className="h-40 w-8/12 pr-16 mb-10 flex justify-between ">
                <div className="text-grey700 w-52 text-base font-medium ">
                  รูปภาพ
                </div>
  
                <div className="w-3/4 h-40 relative">
                  <Upload.Dragger
                    name="file"
                    accept=".png,.jpg,.jpeg"
                    beforeUpload={(file) => {
                      setFileList([file]);
                      handleFileChange(file);
                      return false;
                    }}
                    maxFileSize={5000}
                    showUploadList={false}
                    className="relative"
                  >
                    {selectedImage && (
                      <div>
                        <Image src={selectedImage} alt="uploaded" width={144} />
                      </div>
                    )}
                    <div>
                      {!selectedImage && (
                        <>
                          <InboxOutlined style={{ fontSize: "36px" }} />
                          <p className="ant-upload-text">อัพโหลดรูปภาพ</p>
                          <p className="ant-upload-hint">
                            PNG, JPG ขนาดไม่เกิน 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </Upload.Dragger>
                  <div className="flex justify-between text-grey700 text-xs z-0 mt-1">
                    <span className="pt-0.5">ขนาดภาพที่แนะนำ: 1440 x 225 PX</span>
                    <button onClick={handleDeleteImage} className="border-none cursor-pointer font-semibold text-sm underline text-blue600 hover:text-blue400 active:text-blue800">ลบรูปภาพ</button>
                  </div>
                </div>
              </div>
  
              <hr className="mb-10 text-grey300 "></hr>
  
              <div className="mb-10 text-grey700 text-base font-medium ">
                รายการบริการย่อย
              </div>
              <DragDropContext>
                <Form.List name="items">
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      {fields.map((field) => (
                        <div
                          key={field.key}
                          style={{ display: "flex", gap: "16px" }}
                        >
                          <div style={{ flex: "1" }}>
                            <Form.Item
                              colon={false}
                              label="ชื่อรายการ"
                              name={[field.name, "name"]}
                              labelAlign="top"
                              labelCol={{ span: 24 }}
                            >
                              <Input
                                name="sub_service_name"
                                // value={formData.sub_service_name}
                                // onChange={handleChange}
                              />
                            </Form.Item>
                          </div>
                          <div style={{ flex: "1" }}>
                            <Form.Item
                              colon={false}
                              label="ค่าบริการ / 1 หน่วย"
                              name={[field.name, "cost"]}
                              labelAlign="top"
                              labelCol={{ span: 24 }}
                            >
                              <InputNumber
                                formatter={(value) =>
                                  `฿ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                parser={(value) =>
                                  value.replace(/฿\s?|(,*)/g, "")
                                }
                                name="price_per_unit"
                                // value={formData.price_per_unit}
                                // onChange={(value) =>
                                //   setFormData({
                                //     ...formData,
                                //     price_per_unit: value,
                                //   })
                                // }
                              />
                            </Form.Item>
                          </div>
                          <div style={{ flex: "1" }}>
                            <Form.Item
                              colon={false}
                              label="หน่วยการบริการ"
                              name={[field.name, "unit"]}
                              labelAlign="top"
                              labelCol={{ span: 24 }}
                            >
                              <Input
                                name="unit"
                                // value={formData.unit}
                                // onChange={handleChange}
                              />
                            </Form.Item>
                          </div>
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            <Form.Item colon={false} label="">
                              <a
                                onClick={() => {
                                  remove(field.name);
                                }}
                              >
                                ลบรายการ
                              </a>
                            </Form.Item>
                          </div>
                        </div>
                      ))}
  
                      <button
                        className="btn-secondary flex items-center justify-center text-base font-medium w-56 h-11"
                        type="button"
                        onClick={() => add()}
                      >
                        + เพิ่มรายการ
                      </button>
                    </div>
                  )}
                </Form.List>
              </DragDropContext>
            </div>
          </div>
        </Form>
      </>
    );
  }
  
  export default ServiceEditForm;
  