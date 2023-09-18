import { Form, Input, Upload, Select, message, InputNumber } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import  {useUtils}  from "../../hooks/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

function AddService() {
  const { Dragger } = Upload;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");

  useEffect(() => {
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        setData(response.data.data); // Store data in state
        setCategory(response.data.data);
        console.log(response.data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(data.data);
  console.log(category);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setImageUrl(info.file.response.url);
    }
    if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
      <div className="bg-grey100 h-full pb-4% md:pb-0 md:pl-60">
        <div className="flex items-center h-20 px-10 justify-between border-b border-grey300 bg-white">
          <h1 className="text-xl font-medium">เพิ่มบริการ</h1>
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
              สร้าง
            </button>
          </div>
        </div>
        <div className="bg-white m-10 rounded p-4 w-full max-w-[1120px] mx-auto">
          {/* flex flex-col items-start  */}
          <Form
            labelCol={{ span: 100 }}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
          >
            <Form.Item
              label={<span style={labelStyle}>ชื่อบริการ</span>}
              colon={false}
              rules={[
                {
                  required: true,
                  message: "โปรดกรอกชื่อบริการ",
                },
              ]}
            >
              <Input style={{ width: "50%" }} />
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
                  {data && data.data && data.data.map((categoryItem) => (
                    <Select.Option
                      key={categoryItem.category_id}
                      value={categoryItem.category_name}
                    >
                      {categoryItem.category_name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              label={<span style={labelStyle}>รูปภาพ</span>}
              colon={false}
            >
              <Dragger
                style={{ width: "50%" }}
                name="file"
                multiple={false}
                action="/your-upload-endpoint"
                onChange={handleChange}
                showUploadList={false}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}

                <p className="ant-upload-drag-icon"></p>
                <p className="ant-upload-text">
                  <span>อัพโหลดรูปภาพ </span> <span>หรือ ลากและวางที่นี่</span>
                </p>
                <p className="ant-upload-hint">PNG, JPG ขนาดไม่เกิน 5MB</p>
              </Dragger>
            </Form.Item>
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
                            <Input />
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
                            <Input />
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
                      type="submit"
                      onClick={() => add()}
                    >
                      + เพิ่มรายการ
                    </button>
                  </div>
                )}
              </Form.List>
            </DragDropContext>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddService;
