import {
  Form,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Button,
  Col,
  Row,
  message,
  InputNumber,
} from "antd";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../../assets/AdminPhoto/arrow.png";
import trash from "../../assets/homepagePhoto/trash.svg";
import AlertBoxDelete from "../AlertBox.jsx";
import dayjs from 'dayjs';


function PromotionEdit() {
  // const [promotion, setPromotion] = useState({});

  const { promotionId } = useParams();

  const [promotionDetail, setPromotionDetail] = useState(""); //ใช้กับ header
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);


  const [newFormData, setFormData] = useState({
    promotion_code: "",
    promotion_types: "",
    promotion_discount: "",
    promotion_quota: "",
    promotion_expiry_date: null,
    promotion_expiry_time: null,  
  });

  const navigate = useNavigate();

  const now = dayjs();

  const params = useParams();

  const isFutureTime = (current) => {
    const now = dayjs().startOf("day");
    const currentTime = dayjs();
    const selectedTime = dayjs(current);
    return (
      selectedTime.isAfter(now) ||
      (selectedTime.isSame(now, "day") && selectedTime.isAfter(currentTime))
    );
  };

  const isFutureDate = (current) => {
    const now = dayjs().startOf("day");
    return current && current.isAfter(now);
  };

  useEffect(() => {
    const getPromotionDetail = async (promotionId) => {
      try {
        const result = await axios.get(
          `http://localhost:4000/promotion/${promotionId}`
        );
        setPromotionDetail(result.data.data[0].promotion_code);
        setFormData({
          promotion_code: result.data.data[0].promotion_code,
          promotion_types: result.data.data[0].promotion_types,
          promotion_discount: result.data.data[0].promotion_discount,
          promotion_quota: result.data.data[0].promotion_quota,
          promotion_expiry_date: dayjs(
            result.data.data[0].promotion_expiry_date
          ),
          promotion_expiry_time: moment(
            result.data.data[0].promotion_expiry_time,
            "HH:mm"
          ),       
          promotion_created_date_time:
            result.data.data[0].promotion_created_date_time,
          promotion_edited_date_time:
            result.data.data[0].promotion_edited_date_time,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getPromotionDetail(promotionId);
  }, [promotionId]);

  console.log("newformData", newFormData);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/promotion/${promotionId}`);
      message.success("ลบโปรโมชั่นสำเร็จ");
      navigate("/admin-promotion");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบโปรโมชั่น:", error);
    }
  };

  const showDeleteConfirmation = () => {
    setDeleteConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      promotion_expiry_date: date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      promotion_expiry_time: time,
    }));
  };

  const handleSubmitEdit = async () => {
    try {
      console.log("formData", newFormData);

      const formData = new FormData();

      formData.append("promotion_code", newFormData.promotion_code);
      formData.append("promotion_types", newFormData.promotion_types);
      formData.append("promotion_discount", newFormData.promotion_discount);


      formData.append("promotion_quota", newFormData.promotion_quota);

      if (newFormData.promotion_expiry_date) {
        formData.append(
          "promotion_expiry_date",
          newFormData.promotion_expiry_date.format("YYYY-MM-DD")
        );
      }

      if (newFormData.promotion_expiry_time) {
        formData.append(
          "promotion_expiry_time",
          newFormData.promotion_expiry_time.format("HH:mm")
        );
      }


      const response = await axios.put(
        `http://localhost:4000/promotion/${params.promotionId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success("แก้ไขโปรโมชั่นสำเร็จ");
      }
      navigate("/admin-promotion");
    } catch (error) {
      console.error("Error creating promotion:", error);
    }
  };

  const labelStyle = {
    marginTop: "10px",
    color: "var(--gray-900, #323640)",
    fontFamily: "Prompt",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%", // 24px
    width: "12.8125rem",
    textAlign: "left",
  };

  // console.log('initial', initialValues)

  return (
    <div>
      <Form
        labelCol={{ span: 100 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        name="promotion_form"
        initialValues={{
          promotion_expiry_date: newFormData.promotion_expiry_date,    
          promotion_expiry_time: newFormData.promotion_expiry_time 
        }}
        onFinish={handleSubmitEdit}
        requiredMark={false}
      >
        <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
          <div className="header-detail justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
            <div className="flex gap-[14px] h-12 w-fit">
              <img
                src={arrow}
                className=" h-[40px] w-[40px] cursor-pointer hover:scale-110 transition"
                onClick={() => navigate("/admin-promotion")}
              />
              <div className="Header-name">
                <p className="service-text text-xs">Promotion Code</p>
                <h1
                  name={promotionDetail}
                  className="text-black   font-semibold text-xl"
                >
                  {promotionDetail}
                </h1>
              </div>
            </div>
            <div className="flex">
              <button
                className="btn-secondary flex items-center justify-center text-base font-medium w-28 h-11"
                onClick={() => navigate("/admin-promotion")}
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
          <div className="bg-white mx-10 mt-10 p-6 border border-grey200 rounded-lg">
            <Form.Item
              label={<span style={labelStyle}>Promotion Code</span>}
              colon={false}
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุโค้ด",
                },
              ]}
            >
              <Input
                className="w-1/2"
                value={newFormData.promotion_code}
                onChange={(e) =>
                  setFormData({
                    ...newFormData,
                    promotion_code: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>ประเภท</span>}
              colon={false}
              // name="promotion_types"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกประเภทของโค้ด",
                },
              ]}
            >
              <Radio.Group
                value={newFormData.promotion_types}
                onChange={(e) =>
                  setFormData({
                    ...newFormData,
                    promotion_types: e.target.value,
                  })
                }
              >
                <div className="flex flex-row">
                  <Form.Item
                    // name="promotion_types"
                    valuePropName="checked"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio value="fixed" className="w-24">
                      Fixed
                    </Radio>
                  </Form.Item>

                  <Form.Item
                    // name="promotion_discount"
                    colon={false}
                    rules={[
                      {
                        validator: (rule, value) => {
                          const numericValue = parseFloat(value);
                          if (
                            isNaN(numericValue) ||
                            numericValue < 1 ||
                            numericValue > 1000
                          ) {
                            return Promise.reject(
                              "Please enter a number between 1 and 1000"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "50%" }}
                      suffix="฿"
                      value={
                        newFormData.promotion_types === "fixed"
                          ? newFormData.promotion_discount
                          : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...newFormData,
                          promotion_discount: e.target.value,
                        })
                      }
                      disabled={newFormData.promotion_types === "percent"}
                    />
                  </Form.Item>
                </div>

                <div className="flex flex-row">
                  <Form.Item
                    // name="promotion_types"
                    valuePropName="checked"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio className="w-24" value="percent">
                      Percent
                    </Radio>
                  </Form.Item>

                  <Form.Item
                    // name="promotion_discount"
                    colon={false}
                    rules={[
                      {
                        validator: (rule, value) => {
                          const numericValue = parseFloat(value);
                          if (
                            isNaN(numericValue) ||
                            numericValue < 1 ||
                            numericValue > 100
                          ) {
                            return Promise.reject(
                              "Please enter a number between 1 and 100"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      value={
                        newFormData.promotion_types === "percent"
                          ? newFormData.promotion_discount
                          : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...newFormData,
                          promotion_discount: e.target.value,
                        })
                      }
                      style={{ width: "50%" }}
                      suffix="%"
                      disabled={newFormData.promotion_types === "fixed"}
                    />
                  </Form.Item>
                </div>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              // name="promotion_quota"
              label={<span style={labelStyle}>โควต้าการใช้</span>}
              colon={false}
              rules={[
                {
                  // required: true,
                  min: 1,
                  message: "กรุณาระบุจำนวนครั้งให้ถูกต้อง",
                },
                {
                  validator: (rule, value) => {
                    const numericValue = parseFloat(value);
                    if (
                      isNaN(numericValue) ||
                      numericValue < 1 ||
                      numericValue > 1000
                    ) {
                      return Promise.reject("กรุณาระบุจำนวนครั้งต่ำกว่า 1000");
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                suffix="ครั้ง"
                value={newFormData.promotion_quota}
                onChange={(e) =>
                  setFormData({
                    ...newFormData,
                    promotion_quota: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              // name="promotion_expiry_date"
              label={<span style={labelStyle}>วันหมดอายุ</span>}
              colon={false}
            >
              <Row gutter={1}>
                <Col span={8}>
                  <Form.Item
                    // name="promotion_expiry_date"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุวัน",
                      },
                    ]}
                    noStyle
                  >
                    <DatePicker
                      value={newFormData.promotion_expiry_date}
                      onChange={handleDateChange}
                      // onChange={(e) => 
                      //   setFormData({
                      //   ...newFormData,
                      //   promotion_expiry_date: e.target.value
                      // })}
                      format="YYYY-MM-DD"
                      disabledDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                      style={{ width: "50%" }}
                 
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    // name="promotion_expiry_time"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุเวลา",
                      },
                    ]}
                    noStyle
                  >
                    <TimePicker
                      value={newFormData.promotion_expiry_time}
                      onChange={handleTimeChange}                   
                      format="HH:mm"
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <hr className="mt-10 mb-10 text-grey300 "></hr>
            <p className="pb-[25px] ">
              <span className="text-grey700">สร้างเมื่อ</span>
              <span className="px-[200px] text-black ">
                {dateFormat(newFormData.promotion_created_date_time)}
              </span>
            </p>
            <p className="pb-[40px] ">
              <span className="text-grey700">แก้ไขล่าสุด</span>
              <span className="px-[190px] text-black ">
                {dateFormat(newFormData.promotion_edited_date_time)}
              </span>
            </p>
          </div>
        </div>
      </Form>
      <div
        className="flex justify-end mr-12 mt-10 text-[#80899C] underline cursor-pointer"
        onClick={showDeleteConfirmation}
      >
        <img
          className="cursor-pointer w-[25px] h-[25px]  "
          src={trash}
          alt="Delete"
        />{" "}
        ลบ Promotion Code
      </div>
      {deleteConfirmation && (
        <AlertBoxDelete
          deleteFunction={handleDelete}
          hideFunction={hideDeleteConfirmation}
          textAlert="ยืนยันการลบรายการ"
          alertQuestion={`คุณต้องการลบรายการ'${newFormData.promotion_code}ใช่หรือไม่ ?`}
          primary="ลบรายการ"
          secondary="ยกเลิก"
        />
      )}
    </div>
  );
}

export default PromotionEdit;
