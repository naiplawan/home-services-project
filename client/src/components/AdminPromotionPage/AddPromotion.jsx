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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddPromotionForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [inputDisable, setInputDisable] = useState("");
  const [promotionType, setPromotionType] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const isFutureTime = (current) => {
    const now = moment().startOf("day");
    const currentTime = moment();
    const selectedTime = moment(current);
    return (
      selectedTime.isAfter(now) ||
      (selectedTime.isSame(now, "day") && selectedTime.isAfter(currentTime))
    );
  };

  const isFutureDate = (current) => {
    const now = moment().startOf("day");
    return current && current.isAfter(now);
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      console.log("Selected Date:", selectedDate.format("YYYY-MM-DD"));
      console.log("Selected Time:", selectedTime.format("HH:mm"));

      let promotionDiscount;

      if (promotionType === "fixed") {
        promotionDiscount = values.promotion_discount_fixed;
      } else if (promotionType === "percent") {
        promotionDiscount = values.promotion_discount_percent;
      }

      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }
      // const formattedExpiryDate = moment(selectedDate).format("YYYY-MM-DD");
      // const formattedExpiryTime = moment(selectedTime).format("HH:mm");

      if (selectedDate) {
        formData.append(
          "promotion_expiry_date",
          selectedDate.format("YYYY-MM-DD")
        );
      }

      if (selectedTime) {
        formData.append(
          "promotion_expiry_time",
          selectedTime.format("HH:mm")
        );
      }

      formData.append("promotion_expiry_date", selectedDate);
      formData.append("promotion_expiry_time", selectedTime);
      formData.append("promotion_discount", promotionDiscount);

      const response = await axios.post(
        "http://localhost:4000/promotion",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success("สร้างโปรโมชั่นโค้ดใหม่สำเร็จ");
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
    lineHeight: "150%",
    width: "12.8125rem",
    textAlign: "left", // 24px
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 100 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      name="promotion_form"
      onFinish={onFinish}
      requiredMark={false}
    >
      <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
        <div className="flex items-center h-20 px-10 justify-between border-b border-grey300 bg-white">
          <h1 className="text-xl font-medium">เพิ่ม Promotion Code</h1>
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
              สร้าง
            </button>
          </div>
        </div>
        <div className="bg-white mx-10 mt-10 p-6 border border-grey200 rounded-lg">
          <Form.Item
            label={<span style={labelStyle}>Promotion Code</span>}
            colon={false}
            name="promotion_code"
            rules={[
              {
                required: true,
                message: "กรุณาระบุโค้ด",
              },
            ]}
          >
            <Input className="w-1/2" />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>ประเภท</span>}
            colon={false}
            name="promotion_types"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกประเภทของโค้ด",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setPromotionType(e.target.value);
                setInputDisable(
                  e.target.value === "percent" ? "promotion_types" : ""
                );
              }}
              value={promotionType}
            >
              <div className="flex flex-row">
                <Form.Item
                  name="promotion_types"
                  valuePropName="checked"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Radio className="w-24" value="fixed">
                    Fixed
                  </Radio>
                </Form.Item>

                <Form.Item
                  colon={false}
                  name="promotion_discount_fixed"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("promotion_types") === "fixed") {
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
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    style={{ width: "50%" }}
                    suffix="฿"
                    disabled={promotionType === "percent"}
                  />
                </Form.Item>
              </div>

              <div className="flex flex-row">
                <Form.Item
                  name="promotion_types"
                  valuePropName="checked"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Radio className="w-24" value="percent">
                    Percent
                  </Radio>
                </Form.Item>

                <Form.Item
                  colon={false}
                  name="promotion_discount_percent"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue("promotion_types") === "percent") {
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
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    style={{ width: "50%" }}
                    suffix="%"
                    disabled={promotionType === "fixed"}
                  />
                </Form.Item>
              </div>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>โควต้าการใช้</span>}
            colon={false}
            name="promotion_quota"
            rules={[
              {
                required: true,
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
            <Input style={{ width: "50%" }} suffix="ครั้ง" />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>วันหมดอายุ</span>}
            colon={false}
          >
            <Row gutter={1}>
              <Col span={8}>
                <Form.Item
                  name="promotion_expiry_date"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุวัน",
                    },
                  ]}
                  noStyle
                >
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="YYYY-MM-DD"
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="promotion_expiry_time"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุเวลา",
                    },
                  ]}
                  noStyle
                >
                  <TimePicker
                    value={selectedTime}
                    onChange={handleTimeChange}
                    format="HH:mm"
                    // disabledHours={() => {
                    //   const now = moment();
                    //   const currentHour = now.hour();
                    //   return Array.from({ length: currentHour }, (_, i) => i);
                    // }}
                    // disabledMinutes={(selectedHour) => {
                    //   const now = moment();
                    //   const currentHour = now.hour();
                    //   if (selectedHour === currentHour) {
                    //     const currentMinute = now.minute();
                    //     return Array.from(
                    //       { length: currentMinute },
                    //       (_, i) => i
                    //     );
                    //   }
                    //   return [];
                    // }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}

export default AddPromotionForm;
