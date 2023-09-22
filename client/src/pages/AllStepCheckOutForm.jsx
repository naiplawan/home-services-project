import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import arrowBlue from "../assets/CustomerPhoto/icons/arrow-blue.svg"
import arrowWhite from "../assets/CustomerPhoto/icons/arrow-white.svg";
import sellblack from "../assets/CustomerPhoto/icons/sellblack.svg";
import axios from "axios";
import greyarrow from "../assets/CustomerPhoto/icons/BackGrey.svg";
import { message, Steps, Form, Input, DatePicker, TimePicker } from "antd";

function AllStepCheckOutForm() {
  const [service, setService] = useState({});
  const [form] = Form.useForm();
  const params = useParams();
  const [current, setCurrent] = useState(0);
  const [selectedSubService, setSelectedSubService] = useState([]);
  const { TextArea } = Input;
  const navigate = useNavigate();

  console.log("params.serviceId:", params.serviceId);
  console.log("Service Data:", service);

  const steps = [
    {
      title: "รายการ",
      content: "First-content",
    },
    {
      title: "กรอกข้อมูลบริการ",
      content: "Second-content",
    },
    {
      title: "ชำระเงิน",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
        console.error("Service data is not valid:", serviceData);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);

  const handleIncrement = (subService) => {
    const index = selectedSubService.findIndex(
      (item) => item.sub_service_id === subService.sub_service_id
    );

    if (index === -1) {
      setSelectedSubService([
        ...selectedSubService,
        { ...subService, count: 1 },
      ]);
    } else {
      const updatedSubService = [...selectedSubService];
      updatedSubService[index].count += 1;
      setSelectedSubService(updatedSubService);
    }
  };

  const handleDecrement = (subServiceId) => {
    const updatedSubService = [...selectedSubService];
    const subServiceIndex = updatedSubService.findIndex(
      (item) => item.sub_service_id === subServiceId
    );

    if (subServiceIndex !== -1) {
      updatedSubService[subServiceIndex].count -= 1;

      if (updatedSubService[subServiceIndex].count === 0) {
        updatedSubService.splice(subServiceIndex, 1);
      }

      setSelectedSubService(updatedSubService);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSubService;
  };

  const handleFormSubmit = (formValues) => {
    // Handle form submission logic here
    console.log("Form values:", formValues);

    // Assuming you want to move to the next step after form submission
    next();
  };

  console.log(current)

  return (
    <div className="First-content bg-grey300" content="First-content">
      <Navbar />
      <div className="">
        {service.service_photo && service.service_photo ? (
          <div className="h-[300px] overflow-hidden flex items-center justify-center relative bg-blue900">
            <img
              src={service.service_photo}
              alt="Service Photo"
              className="min-w-full mt-40 mix-blend-screen"
            />
            <div className="rounded-lg px-10 py-[10px] w-auto h-[68px] text-center text-[#646C80]  bg-opacity-12 shadow-[2px_2px_24px_rgba(23,51,106,0.12)] absolute bg-white left-[12rem]">
              บริการของเรา
              <img src={greyarrow} className="inline mx-3" />
              <span className="text-[32px] text-[#336DF2] ">
                {service.service_name}
              </span>
            </div>
          </div>
        ) : (
          <p>No service photo available.</p>
        )}
        <div className="w-[80%] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto top-80 absolute bg-white left-[12rem] ">
          <Steps current={0} labelPlacement="vertical" items={items} />
        </div>
      </div>
      <div className="flex my-8 lg:mx-[12rem] md:mx-10 justify-between min-h-screen w-[80%]  bg-white ">
        {current === 0 ? (
          <div className="h-full w-[687px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg  bg-white mt-20 ">
            <div className="text-[20px] text-[#646C80]">
              เลือกรายการบริการ{service.service_name}
            </div>
            <div className="mt-4">
              {service.sub_service && service.sub_service.length > 0 && (
                <div>
                  <ul>
                    {service.sub_service.map((subService, index) => (
                      <div
                        key={subService.sub_service_id}
                        className={`py-5 flex justify-between items-center${
                          index === service.sub_service.length - 1
                            ? ""
                            : " border-b border-[#CCD0D7]"
                        }`}
                      >
                        <div>
                          <li className="text-[18px] font-bold">
                            {subService.sub_service_name}
                          </li>
                          <img src={sellblack} className="inline mr-2" />
                          <li className="text-[14px] text-[#646C80] inline">
                            {subService.price_per_unit}.00฿ / {subService.unit}
                          </li>
                        </div>
                        <div className="flex flex-row items-center p-">
                          <div className="flex items-center justify-center mx-3 w-[43px] h-[43px] border border-[#336DF2] rounded-[8px]">
                            <button
                              className="text-[25px] text-[#336DF2]"
                              onClick={() =>
                                handleDecrement(subService.sub_service_id)
                              }
                            >
                              -
                            </button>
                          </div>
                          <div className="mx-3">
                            {selectedSubService.find(
                              (item) =>
                                item.sub_service_id ===
                                subService.sub_service_id
                            )?.count || 0}
                          </div>
                          <div className="flex items-center justify-center mx-3 w-[43px] h-[43px] border border-[#336DF2] rounded-[8px]">
                            <button
                              className="text-[25px] text-[#336DF2]"
                              onClick={() => handleIncrement(subService)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : current === 1 ? (
          <div
            className="Second-content h-full w-[687px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg mt-20"
            content="Second-content"
          >
            <div className="w-[80%] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto top-80 absolute bg-white left-[12rem] ">
              <Steps current={current} labelPlacement="vertical" items={items} />
            </div>
            
            <div className="flex my-8 lg:mx-[12rem] md:mx-10 justify-between min-h-screen w-[80%]">
              <div className="h-full w-[687px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg mt-20 ">
                <Form
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 19 }}
                  form={form}
                  autoComplete="on"
                  onFinish={(formValues) => {
                    // Handle form submission and pass formValues to the next step
                    handleFormSubmit(formValues);
                  }}
                >
                  <h1 className="text-gray300 text-center text-[20px] font-medium">
                    กรอกข้อมูลบริการ
                  </h1>

                  <Form.Item
                    label="วันที่สะดวกใช้บริการ"
                    className="font-medium text-grey900"
                    name="date"
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="กรุณาเลือกวันที่"
                      className="w-[22.5vw] h-[44px] px-4 py-2.5"
                    />
                  </Form.Item>

                  <Form.Item
                    label="เวลาที่สะดวกใช้บริการ"
                    className="font-medium text-grey900"
                    name="time"
                  >
                    <TimePicker
                      format="HH:mm"
                      placeholder="กรุณาเลือกเวลา"
                      className="w-[22.5vw] h-[44px] px-4 py-2.5"
                    />
                  </Form.Item>

                  <Form.Item
                    label="ที่อยู่"
                    className="font-medium text-grey900"
                    name="address"
                  >
                    <Input placeholder="กรุณากรอกที่อยู่" allowClear />
                  </Form.Item>

                  <div className="w-full flex justify-between mt-4">
                    <Form.Item
                      label="แขวง / ตำบล"
                      className="font-medium text-grey900"
                      name="subdistrict"
                    >
                      <Input placeholder="กรุณากรอกแขวง / ตำบล" allowClear />
                    </Form.Item>
                    <Form.Item
                      label="เขต / อำเภอ"
                      className="font-medium text-grey900"
                      name="district"
                    >
                      <Input placeholder="กรุณากรอกเขต / อำเภอ" allowClear />
                    </Form.Item>
                  </div>

                  <div className="w-full flex justify-between mt-4">
                    <Form.Item
                      label="จังหวัด"
                      className="font-medium text-grey900"
                      name="province"
                    >
                      <Input placeholder="กรุณากรอกจังหวัด" allowClear />
                    </Form.Item>
                    <Form.Item
                      label="รหัสไปรษณีย์"
                      className="font-medium text-grey900"
                      name="zipcode"
                    >
                      <Input placeholder="กรุณากรอกรหัสไปรษณีย์" allowClear />
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="ระบุข้อมูลเพิ่มเติม"
                    className="font-medium text-grey900"
                    name="additionalInfo"
                  >
                    <TextArea
                      placeholder="กรุณาระบุข้อมูลเพิ่มเติม"
                      autoSize={{ minRows: 3 }}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="Last-content  h-full w-[687px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg mt-20"
            content="Last-content"
          >
            <div className="w-[80%] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto top-80 absolute bg-white left-[12rem] ">
              <Steps current={2} labelPlacement="vertical" items={items} />
            </div>
            นี่คือเนื้อหาของ Step ที่ 3
          </div>
        )}
        <div className="h-full w-[562px] py-8 px-6 flex flex-col justify-between border border-grey300 rounded-lg mr-0 top-40 mt-20 ">
          <div className="summary-box pb-3 text-[20px] text-[#646C80]">สรุปรายการ</div>
          <ul>
            {calculateTotalPrice().map((item, index) => (
              <li key={index} className="flex justify-between">
                <p>{item.sub_service_name}</p>
                <p>
                  {item.count > 1
                    ? `${item.count} ${item.unit}`
                    : `1  ${item.unit}`}
                </p>
              </li>
            ))}
          </ul>
          <div className="w-[301]px h-[1px] border border-[#CCD0D7]"></div>
          <div className="flex justify-between pt-3">
            <div className="text-[16px] text-[#646C80]">รวม</div>
            <div>
              {calculateTotalPrice().reduce(
                (total, item) => total + item.price_per_unit * item.count,
                0
              )}
              .00฿
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5 sticky bottom-0 z-[100] border-y-grey300 border-x-white border px-40 bg-white">
  {current === 0 ? (
    <>
      <button
        className="btn-secondary flex items-center justify-center text-base font-medium w-40 p-2 px-6"
        onClick={() => {
          // Navigate to "/services-list" when current === 0
          navigate("/services-list");
        }}
      >
        ย้อนกลับ
        <img src={arrowBlue} alt="arrow" />
      </button>
      <button
        className="btn-secondary-[#336DF2]  flex items-center justify-center text-white font-medium w-40 p-2 px-6 bg-[#336DF2] rounded-lg"
        onClick={next}
      >
        ดำเนินการต่อ
        <img src={arrowWhite} alt="goarrow" />
      </button>
    </>
  ) : (
    <>
      {current > 0 && (
        <button
          className="btn-secondary flex items-center justify-center text-base font-medium w-40 p-2 px-6"
          onClick={() => prev()}
        >
          ย้อนกลับ
          <img src={arrowBlue} alt="arrow" />
        </button>
      )}
      {current < steps.length - 1 && (
        <button
          className="btn-secondary-[#336DF2]  flex items-center justify-center text-white font-medium w-40 p-2 px-6 bg-[#336DF2] rounded-lg"
          onClick={current === 2 ? () => next(onFinish()) : () => next()}
        >
          ดำเนินการต่อ
          <img src={arrowWhite} alt="goarrow" />
        </button>
      )}
      {current === steps.length - 1 && (
        <button
          type="primary"
          onClick={() => message.success("Processing complete!")}
          className="btn-secondary-[#336DF2]  flex items-center justify-center text-white font-medium w-45 p-2 px-6 bg-[#336DF2] rounded-lg"
        >
          ยืนยันการชำระเงิน
        </button>
      )}
    </>
  )}
</div>
    </div>

  );
}


export default AllStepCheckOutForm;