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

function PromotionEdit() {
  const [promotion, setPromotion] = useState({});
  const [promotionDetail, setPromotionDetail] = useState(""); //ใช้กับ header

  const navigate = useNavigate();

  const params = useParams();

  const getPromotionDetail = async (promotionId) => {
    const result = await axios.get(
      `http://localhost:4000/promotion/${promotionId}`
    );
    setPromotion(result.data.data[0]);
    setPromotionDetail(result.data.data[0].promotion_code);

    console.log(result.data.data[0]);
  };

  useEffect(() => {
    getPromotionDetail(params.promotionId);
    console.log(params.promotionId);
  }, []);



  const onFinish = async (values) => {
    try {
      console.log(values);
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }
      const formattedExpiryDate = moment(values.promotion_expiry_date).format(
        "YYYY-MM-DD"
      );
      const formattedExpiryTime = moment(values.promotion_expiry_time).format(
        "HH:mm"
      );

      formData.append("promotion_expiry_date", formattedExpiryDate);
      formData.append("promotion_expiry_time", formattedExpiryTime);

      const response = await axios.put(
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
    lineHeight: "150%", // 24px
  };

  return (
    <Form
      labelCol={{ span: 100 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      name="promotion_form"
      initialValues={{
        promotion_code: promotion.prmotion_code || "",
        promotion_types: promotion.promotion_types || "",
        promotion_discount: promotion.promotion_discount || "",
        promotion_expiry_date: promotion.promotion_expiry_date || "",
        promotion_quota: promotion.promotion_quota || "",
        promotion_expiry_time: promotion.promotion_expiry_time || "",
        promotion_created_date_time:
          promotion.promotion_created_date_time || "",
        promotion_edited_date_time: promotion.promotion_edited_date_time || "",
      }}
      onFinish={onFinish}
      requiredMark={false}
    >
      <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
        <div>
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
          {/* {promotionById.map((promotion) => { */}
          <div className="bg-white mx-10 mt-10 p-6 border border-grey200 rounded-lg">
            <Form.Item
              label={<span style={labelStyle}>Promotion Code</span>}
              colon={false}
              //   name="promotion_code"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุโค้ด",
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                name="promotion_code"
                value={promotion.promotion_code}
                onChange={(e) =>
                  setPromotion({ ...promotion, promotion_code: e.target.value })
                }
              />
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
              <Radio.Group>
                <div className="flex flex-row">
                  <Form.Item
                    name="promotion_types"
                    valuePropName="checked"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio value="fixed">Fixed</Radio>
                  </Form.Item>

                  <Form.Item
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.promotion_types !==
                      currentValues.promotion_types
                    }
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      return getFieldValue("promotion_types") === "fixed" ? (
                        <Form.Item
                          colon={false}
                          name="promotion_discount"
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
                            disabled={
                              getFieldValue("promotion_types") !== "fixed"
                            }
                          />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                </div>

                <div className="flex flex-row">
                  <Form.Item
                    name="promotion_types"
                    valuePropName="checked"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio value="percent">Percent</Radio>
                  </Form.Item>

                  <Form.Item
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.promotion_types !==
                      currentValues.promotion_types
                    }
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      return getFieldValue("promotion_types") === "percent" ? (
                        <Form.Item
                          colon={false}
                          name="promotion_discount"
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
                            style={{ width: "50%" }}
                            suffix="%"
                            disabled={
                              getFieldValue("promotion_types") !== "percent"
                            }
                          />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                </div>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>โควต้าการใช้</span>}
              colon={false}
              //   name="promotion_quota"
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
              <Input
                style={{ width: "50%" }}
                suffix="ครั้ง"
                name="promotion_quota"
                value={promotion.promotion_quota}
                onChange={(e) =>
                  setPromotion({
                    ...promotion,
                    promotion_quota: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>วันหมดอายุ</span>}
              colon={false}
              // name="promotion_expiry"
              rules={[
                {
                  message: "กรุณาระบุวัน-เวลา หมดอายุ",
                },
              ]}
            >
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="promotion_expiry_date"
                    value={promotion.promotion_expiry_date}
                    onChange={(e) =>
                      setPromotion({
                        ...promotion,
                        promotion_expiry_date: e.target.value,
                      })
                    }
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุวัน",
                      },
                    ]}
                    noStyle
                  >
                    <DatePicker style={{ width: "50%" }} />
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
                    <TimePicker format="HH:mm" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <hr className="mt-10 mb-10 text-grey300 "></hr>
            <p className="pb-[25px] ">
              <span className="text-grey700">สร้างเมื่อ</span>
              <span className="px-[200px] text-black ">
                {dateFormat(promotion.promotion_created_date_time)}
              </span>
            </p>
            <p className="pb-[40px] ">
              <span className="text-grey700">แก้ไขล่าสุด</span>
              <span className="px-[190px] text-black ">
                {dateFormat(promotion.promotion_edited_date_time)}
              </span>
            </p>
          </div>
          ;{/* })} */}
        </div>
      </div>
    </Form>
  );
}

export default PromotionEdit;
