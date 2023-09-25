import {
  Form,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Button,
  Col,
  Row,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddPromotionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    promotion_code: "",
    promotion_types: "fixed",
    promotion_quota: "",
    promotion_discount_amount: "",
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

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await fetch("/api/promotions", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Promotion created successfully!");
      } else {
        console.error("Error creating promotion:", response.statusText);
      }
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
            label="Promotion Code"
            name="promotion_code"
            rules={[
              {
                required: true,
                message: "Please input the promotion code!",
              },
            ]}
            style={labelStyle}
          >
            <Input style={{ width: "50%" }} />
          </Form.Item>

          <Form.Item
            label="Promotion Type"
            name="promotion_types"
            initialValue="fixed"
            rules={[
              {
                required: true,
                message: "Please select a promotion type!",
              },
            ]}
          >
            <Radio.Group onChange={handleTypeChange}>
              <Form.Item
                name="promotion_type_fixed"
                valuePropName="checked"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Radio value="fixed">Fixed</Radio>
                {formData.promotion_types === "fixed" && (
                  <Form.Item
                    noStyle
                    name="promotion_discount_amount"
                    rules={[
                      {
                        required: true,
                        type: "number",
                        min: 1,
                        message:
                          "Please input the discount amount (at least 1)!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
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
                        message:
                          "Please input the discount percentage (at least 1)!",
                      },
                    ]}
                  >
                     <Input
                      type="number"
                      style={{ width: "50%" }} // Adjust the width as needed
                      disabled={
                        formData.promotion_types !== "fixed" &&
                        formData.promotion_types !== "percent"
                      }
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="โควต้าการใช้"
            name="promotion_quota"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "Please input the promotion quota (at least 1)!",
              },
            ]}
            style={labelStyle}
          >
            <Input type="number" style={{ width: "50%" }} />
          </Form.Item>

          <Form.Item
            label="วันหมดอายุ"
            name="promotion_expiry"
            rules={[
              {
                required: true,
                message: "Please select the expiry date and time!",
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item
            label="วันหมดอายุ"
            name="promotion_expiry"
            rules={[
              {
                required: true,
                message: "Please select the expiry date and time!",
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
                      message: "Please select the expiry date!",
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
                      message: "Please select the expiry time!",
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
