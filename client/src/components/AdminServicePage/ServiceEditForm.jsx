import { Form, Input, Upload, Select, message, InputNumber, Image, Result } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../../assets/AdminPhoto/arrow.png";

function ServiceEditForm() {

  const [service, setService] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  // const { Dragger } = Upload;
  // const navigate = useNavigate(); //ใช้
  // // const { serviceId } = useParams(); //ใช้

  // const [service, setService] = useState({}); //ใช้


  // const [data, setData] = useState([]);
  // const [category, setCategory] = useState([]);

  // const [selectedImage, setSelectedImage] = useState(null); //manage the selected image
  // const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");
  // const [fileList, setFileList] = useState([]);
  // const [form] = Form.useForm();

  // const [currentData, setCurrentData] = useState({
  //   service_name: "",
  //   category_id: "",
  //   items: [],
  // });

  // useEffect(() => {
  //   if (currentData) {
  //     form.setFieldValue(currentData);
  //   }
  // }, [currentData]);

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/service/${serviceId}`,
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

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      const serviceData = response.data.data;

      if (serviceData) {
        setService(serviceData);
      } else {
        // Handle the case where the data is not valid
        console.error("Service data is not valid:", serviceData);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);


  // const labelStyle = {
  //   marginTop: "10px",
  //   color: "var(--gray-900, #323640)",
  //   fontFamily: "Prompt",
  //   fontSize: "16px",
  //   fontStyle: "normal",
  //   fontWeight: 500,
  //   lineHeight: "150%", // 24px
  // };

  return (
    <>
      <Form
        labelCol={{ span: 100 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmitEdit}
        // initialValues={currentData} // add initial values
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
              
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ServiceEditForm;
