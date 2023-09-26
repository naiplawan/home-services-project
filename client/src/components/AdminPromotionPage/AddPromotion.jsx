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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    promotion_code: "",
    promotion_types: "",
    promotion_quota: "",
    promotion_discount: "",
    promotion_expiry_date: null,
    promotion_expiry_time: null,
    promotion_created_date: "",
    promotion_edited_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, promotion_types: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, promotion_expiry_date: date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, promotion_expiry_time: time });
  };

  console.log('formData', formData);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.post(
        "http://localhost:4000/promotion",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success("สร้างโปรโมชั่นโค้ดใหม่สำเร็จ");
      } else {
        message.error("ไม่สามารถสร้างโปรโมชั่นโค้ดได้");
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
  };

  return (
    <Form
      labelCol={{ span: 100 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      name="promotion_form"
      initialValues={{
        promotion_types: "fixed",
        promotion_expiry_date: moment(),
        promotion_expiry_time: moment("12:00:00", "HH:mm:ss"),
      }}
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
            <Input style={{ width: "50%" }} onChange={handleInputChange} />
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
            <Radio.Group onChange={handleTypeChange}>
              <Form.Item
                name="promotion_type_fixed"
                valuePropName="checked"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Radio  value="fixed">Fixed</Radio>
                {formData.promotion_types === "fixed" && (
                  <Form.Item
                    noStyle
                    name="promotion_discount"
                    rules={[
                      {
                        required: true,
                        type: "number",
                        min: 1,
                        message: "กรุณาระบุจำนวน",
                      },
                    ]}
                  >
                    <Input
                      formatter={(value) =>
                        `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/฿\s?|(,*)/g, "")}
                      style={{ width: "50%" }} // Adjust the width as needed
                      disabled={
                        formData.promotion_types !== "fixed" &&
                        formData.promotion_types !== "percent"
                      }
                    />
                  </Form.Item>
                )}
              </Form.Item>

              <Form.Item
                name="promotion_type_percent"
                valuePropName="checked"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Radio value="percent">Percent</Radio>
                {formData.promotion_types === "percent" && (
                  <Form.Item
                    noStyle
                    name="promotion_discount_percentage"
                    rules={[
                      {
                        required: true,
                        type: "number",
                        min: 1,
                        max: 100,
                        message: "กรอกข้อมูลให้ถูกต้อง",
                      },
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
                    onChange={handleInputChange} 
                  >
                    <Input
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%")}
                      style={{ width: "50%" }} // Adjust the width as needed
                      disabled={
                        formData.promotion_types !== "fixed" &&
                        formData.promotion_types !== "percent"
                      }
                      placeholder="percent"
                      rules={{
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
                      }}
                      onChange={handleInputChange} 
                    />
                  </Form.Item>
                )}
              </Form.Item>
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
                    return Promise.reject(
                      "กรุณาระบุจำนวนครั้งต่ำกว่า 1000"
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>วันหมดอายุ</span>}
            colon={false}
            name="promotion_expiry"
            rules={[
              {
                required: true,
                message: "กรุณาระบุวัน-เวลา หมดอายุ",
              },
            ]}
          >
            <Row gutter={8}>
              <Col span={12}>
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
                    style={{ width: "50%" }}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <TimePicker format="HH:mm:ss" onChange={handleTimeChange} />
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
