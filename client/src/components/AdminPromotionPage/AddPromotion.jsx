import {
  Form,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Col,
  Row,
} from "antd";
import moment from "moment";
import { useNavigate } from "@/routing/navigation.jsx";
import { notify } from "@/components/ui/notify.js";
import { buttonStyles } from "@/lib/ui-classes.js";
import { useState } from "react";
import axios from "axios";

function AddPromotionForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [, setInputDisable] = useState("");
  const [promotionType, setPromotionType] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
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
        "/api/promotion",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        notify.success("สร้างโปรโมชั่นโค้ดใหม่สำเร็จ");
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
      <div className="min-h-screen bg-grey100 pb-8 pl-14 lg:pb-0 lg:pl-60">
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-grey300 bg-white px-4 py-3 sm:px-6 lg:px-10">
          <h1 className="text-xl font-medium">เพิ่ม Promotion Code</h1>
          <div className="flex gap-2 sm:gap-3">
            <button
              className={`${buttonStyles.secondary} flex h-10 w-24 items-center justify-center !px-3 !py-0 text-sm sm:h-11 sm:w-28 sm:!px-6 sm:!py-2.5 sm:text-base`}
              onClick={() => navigate("/admin-promotion")}
            >
              ยกเลิก
            </button>
            <button
              className={`${buttonStyles.primary} flex h-10 w-24 items-center justify-center !px-3 !py-0 text-sm sm:h-11 sm:w-28 sm:!px-6 sm:!py-2.5 sm:text-base`}
              type="submit"
            >
              สร้าง
            </button>
          </div>
        </div>
        <div className="mx-3 mt-4 rounded-lg border border-grey200 bg-white p-4 sm:mx-6 sm:mt-6 sm:p-6 lg:mx-10 lg:mt-10">
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
            <Input style={{ width: "100%", maxWidth: 520 }} />
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
                    style={{ width: "100%", maxWidth: 520 }}
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
                    style={{ width: "100%", maxWidth: 520 }}
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
            <Input style={{ width: "100%", maxWidth: 520 }} suffix="ครั้ง" />
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
