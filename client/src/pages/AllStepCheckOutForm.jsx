import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import arrowBlue from "../assets/CustomerPhoto/icons/arrow-blue.svg";
import arrowWhite from "../assets/CustomerPhoto/icons/arrow-white.svg";
import sellblack from "../assets/CustomerPhoto/icons/sellblack.svg";
import axios from "axios";
import dayjs from "dayjs";
import credit from "../assets/CustomerPhoto/icons/credit.svg";
import qr from "../assets/CustomerPhoto/icons/qr.svg";
import greyarrow from "../assets/CustomerPhoto/icons/BackGrey.svg";
import { message, Steps, Form, Input, DatePicker, TimePicker } from "antd";
import { Elements } from "@stripe/react-stripe-js"; // npm install --save @stripe/react-stripe-js @stripe/stripe-js
import { loadStripe } from "@stripe/stripe-js";
import { usePromotion } from "../hooks/promotion";

function AllStepCheckOutForm() {
  const [service, setService] = useState({});
  const [form] = Form.useForm();
  const params = useParams();
  const [current, setCurrent] = useState(0);
  const [selectedSubService, setSelectedSubService] = useState([]);
  const { TextArea } = Input;
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const monthFormat = "MM/YY";
  const [promotionCode, setPromotionCode] = useState("");
  const { promotion, getPromotion, checkPromotionExpiry, decreaseQuota } =
    usePromotion();

  const [success, setSuccess] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51Nu6oIL0v3CrBX83LGIIF7Jg1hTUm7LqnHABeSt8Yz0VTyDHTL4ecgodTtLsbhksXbJbd1t4GO7V10nmhM6QbSlh00vyRy9Gv5"
  );

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
      content: "Third-content",
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

  const handleApplyPromotion = async () => {
    console.log(
      "handleApplyPromotion called with promotionCode:",
      promotionCode
    );
    try {
      await getPromotion(promotionCode);
      await checkPromotionExpiry(promotion.promotion_expiry);
      await decreaseQuota(promotion.promotion_code);
      message.success("Promotion applied successfully.");
      console.log("Promotion",promotion.promotion_code)
    } catch (error) {
      message.error(error.message);
    }
  };

  const handlePromotionInputChange = (e) => {
    console.log(
      "handlePromotionInputChange called with value:",
      e.target.value
    );
    setPromotionCode(e.target.value);
  };

  console.log("promotion:", promotion);

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

  const handleFormChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues });
  };

  const handleFormSubmit = (formValues) => {
    // Handle form submission logic here
    console.log("Form values:", formValues);

    // Assuming you want to move to the next step after form submission
    next();
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmitStripe = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement is missing.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: calculateTotalPrice(), // Pass the total amount here
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
        message.error("Payment failed. Please try again.");
      }
    } else {
      console.log(error.message);
      message.error("Payment failed. Please check your card details.");
    }
  };

  console.log("current is:", current);
  console.log("Form:", formData);
  console.log("Subservices:", selectedSubService);

  return (
    <div className="First-content bg-bg" content="First-content">
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
        {current !== 3 && ( // Hide Steps on the Summary page
          <div className="w-[80%] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto top-80 absolute bg-white left-[12rem] ">
            <Steps current={current} labelPlacement="vertical" items={items} />
          </div>
        )}
      </div>
      <div className="flex my-8 lg:mx-[12rem] md:mx-10 justify-between min-h-screen w-[80%]   ">
        {current === 0 ? (
          <div className="h-full w-[900px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg  bg-white mt-20 ">
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
            className="Second-content h-[680px] lg:w-[800px] md:w-[600px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg  bg-white mt-20  "
            content="Second-content"
          >
            <div className="w-[80%] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto top-80 absolute bg-white left-[12rem] ">
              <Steps
                current={current}
                labelPlacement="vertical"
                items={items}
              />
            </div>

            <div className="flex my-8 lg:mx-[12rem] md:mx-10 justify-between min-h-screen w-[80%] ">
              <div className="h-full  w-[900px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between  rounded-lg mt-[-50px] ml-[-200px] md:ml-[-210px] ">
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
                  <h1 className="text-gray300 text-center text-[20px] font-medium mb-[30px]">
                    กรอกข้อมูลบริการ
                  </h1>

                  <Form.Item
                    className="font-medium text-grey900"
                    name="date"
                    label="วันที่สะดวกใช้บริการ"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="กรุณาเลือกวันที่"
                      className="w-[22.5vw] h-[44px] px-4 py-2.5"
                      value={formData.date}
                      onChange={(date) => handleFormChange({ date })}
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
                      value={formData.time}
                      onChange={(time) => handleFormChange({ time })}
                    />
                  </Form.Item>

                  <Form.Item
                    label="ที่อยู่"
                    className="font-medium  text-grey900"
                    name="address"
                  >
                    <Input
                      placeholder="กรุณากรอกที่อยู่"
                      allowClear
                      style={{ height: "44px" }}
                      value={formData.address}
                      onChange={(e) =>
                        handleFormChange({ address: e.target.value })
                      }
                    />
                  </Form.Item>

                  <div className="w-full flex-col justify-between mt-4">
                    <Form.Item
                      label="แขวง / ตำบล"
                      className="font-medium  text-grey900"
                      name="subdistrict"
                    >
                      <Input
                        placeholder="กรุณากรอกแขวง / ตำบล"
                        allowClear
                        style={{ height: "44px" }}
                        value={formData.subdistrict}
                        onChange={(e) =>
                          handleFormChange({ subdistrict: e.target.value })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label="เขต / อำเภอ"
                      className="font-medium text-grey900"
                      name="district"
                    >
                      <Input
                        placeholder="กรุณากรอกเขต / อำเภอ"
                        allowClear
                        style={{ height: "44px" }}
                        value={formData.district}
                        onChange={(e) =>
                          handleFormChange({ district: e.target.value })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className="w-full flex justify-between ml-[95px]">
                    <Form.Item
                      label="จังหวัด"
                      className="font-medium  text-grey900"
                      name="province"
                    >
                      <Input
                        placeholder="กรุณากรอกจังหวัด"
                        allowClear
                        style={{ height: "44px" }}
                        value={formData.province}
                        onChange={(e) =>
                          handleFormChange({ province: e.target.value })
                        }
                      />
                    </Form.Item>
                    <div className="mr-[120px] ">
                      <Form.Item
                        label="รหัสไปรษณีย์ :"
                        className="font-medium  text-grey900"
                        name="zipcode"
                      >
                        <Input
                          placeholder="กรุณากรอกรหัสไปรษณีย์"
                          allowClear
                          style={{ height: "44px", marginLeft: "24px" }}
                          value={formData.zipcode}
                          onChange={(e) =>
                            handleFormChange({ zipcode: e.target.value })
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <Form.Item
                    label="ระบุข้อมูลเพิ่มเติม"
                    className="font-medium text-grey900"
                    name="additionalInfo"
                  >
                    <TextArea
                      placeholder="กรุณาระบุข้อมูลเพิ่มเติม"
                      autoSize={{ minRows: 3 }}
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        handleFormChange({ additionalInfo: e.target.value })
                      }
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        ) : current === 2 ? (
          <div
            className="Last-content  h-full w-[687px] lg:mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border bg-white border-grey300 rounded-lg mt-20"
            content="Last-content"
          >
            <div className="w-[80%] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto top-80 absolute bg-white left-[12rem] ">
              <Steps
                current={current}
                labelPlacement="vertical"
                items={items}
              />
            </div>
            <Elements stripe={stripePromise}>
              <div>ชำระเงิน</div>
              <div className="flex justify-evenly mt-4">
                <button
                  className={`w-full border border-[#CCD0D7] rounded-lg p-1 flex flex-col justify-center items-center focus:outline-none focus:ring focus:ring-[#336DF2] ${
                    selectedPaymentMethod === "qr"
                      ? "bg-[#E7EEFF] focus:ring focus:ring-[#336DF2]"
                      : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("qr")}
                >
                  <img src={qr} />
                  <p>พร้อมเพย์</p>
                </button>
                <button
                  className={`w-full border border-[#CCD0D7] rounded-lg p-1 ml-4 flex flex-col justify-center items-center focus:outline-none focus:ring focus:ring-[#336DF2] ${
                    selectedPaymentMethod === "credit"
                      ? "bg-[#E7EEFF] focus:ring focus:ring-[#336DF2]"
                      : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("credit")}
                >
                  <img src={credit} />
                  <p>บัตรเครดิต</p>
                </button>
              </div>
              <div className="mt-5">
                <p>
                  หมายเลขบัตรเครดิต<span className="text-[#C82438]">*</span>
                </p>
                <input
                  placeholder="กรุณากรอกหมายเลขบัตรเครดิต"
                  className="w-full border border-[#CCD0D7] bg-white rounded-lg p-2"
                  required
                />
              </div>
              <div className="mt-5">
                <p>
                  ชื่อบนบัตร<span className="text-[#C82438]">*</span>
                </p>
                <input
                  placeholder="กรุณากรอกชื่อบนบัตร"
                  className="w-full border bg-white border-[#CCD0D7] rounded-lg p-2"
                  required
                />
              </div>
              <div className="flex mt-5">
                <div>
                  <p>
                    วันหมดอายุ<span className="text-[#C82438]">*</span>
                  </p>
                  <DatePicker
                    defaultValue={dayjs("2015/01", monthFormat)}
                    format={monthFormat}
                    picker="month"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="ml-4">
                  <p>
                    รหัส CVC / CVV
                    <span className="text-[#C82438] bg-white">*</span>
                  </p>
                  <input
                    type="tel"
                    placeholder="xxx"
                    className="w-full border bg-white border-[#CCD0D7] rounded-lg p-0.5"
                    maxLength="3"
                    pattern="([0-9]{3})"
                    required
                  />
                </div>
              </div>
              <div className="my-8 w-full h-[1px] border border-[#CCD0D7]"></div>
              <div>
                <p>Promotion Code</p>
                <input
                  placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
                  className="w-full border bg-white border-[#CCD0D7] rounded-lg p-1"
                  onChange={handlePromotionInputChange} 
                />
              </div>
              <div className="pt-6 ml-5">
                <button className="btn-secondary-[#336DF2]  flex items-center justify-center text-white font-medium w-20 p-1 px-1 bg-[#336DF2] rounded-lg" onClick={handleApplyPromotion}>
                  ใช้โค้ด
                </button>
              </div>
            </Elements>
          </div>
        ) : null}
        {/* summary-box */}
        <div className="h-full w-[562px] py-8 px-6 flex flex-col justify-between bg-white border border-grey300 rounded-lg mr-0 top-40 mt-20 ">
          <div className="summary-box flex-auto text-center pb-3 text-[40px] text-[#646C80]">
            {" "}
            {current === 3 ? "ชำระเงินเรียบร้อยแล้ว" : "สรุปรายการ"}
          </div>
          <ul>
            {calculateTotalPrice().map((item, index) => (
              <li key={index} className="flex justify-between">
                <p className="text-black">{item.sub_service_name}</p>
                <p className="text-black">
                  {item.count > 1
                    ? `${item.count} ${item.unit}`
                    : `1  ${item.unit}`}
                </p>
              </li>
            ))}
          </ul>
          <div className="w-[301]px h-[1px] border border-[#CCD0D7] mt-3"></div>
          <div className="pt-10">
            <div>
              {" "}
              {current === 1 || current === 2 || current === 3 ? (
                <div>
                  <div className="flex justify-between">
                    <div className="text-[#646C80]">วันที่:</div>
                    <div className="text-black">
                      {formData.date ? formData.date.format("DD/MM/YYYY") : ""}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#646C80]">เวลา:</div>
                    <div className="text-black">
                      {formData.time ? formData.time.format("HH:mm") : ""}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#646C80]">สถานที่:</div>
                    <div className="text-black">
                      {formData.address} {formData.subdistrict}{" "}
                      {formData.district} {formData.province} {formData.zipcode}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#646C80]">ข้อมูลเพิ่มเติม:</div>
                    <div className="text-black">{formData.additionalInfo}</div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-[301]px h-[1px] border border-[#CCD0D7] mt-3"></div>
          <div className="flex justify-between pt-5 mb-2">
            <div className="text-[16px] text-[#646C80]">รวม</div>
            <div className="text-black font-bold">
              {calculateTotalPrice().reduce(
                (total, item) => total + item.price_per_unit * item.count,
                0
              )}
              .00฿
            </div>
          </div>
          {current === 3 && (
            <div>
              <button
                className="bg-blue600 w-full h-11 rounded-lg text-white"
                onClick={() => navigate(`/customer-services-history/:userId`)}
              >
                เช็ครายการซ่อม
              </button>
            </div>
          )}
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
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default form submission
                  message.success("Processing complete!");
                  handleSubmitStripe(e); // Pass the event object
                  next();
                }}
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
