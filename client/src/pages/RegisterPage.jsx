import { Button, Form, Input, Checkbox, message } from "antd";
import Navbar from "../components/Navbar";
import { useState } from "react";

function RegisterPage() {
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const inputStyle =
    "border rounded-lg border-gray-300 w-full h-11 px-4 py-2.5";

    const formStyle = {
      display: 'flex',
      width: '440px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px',
    };
    

  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission // State to track checkbox status

  const onFinish = async (values) => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true); // Set form submission to true to prevent double submission
        console.log(values);
        // Simulate API request (replace this with your actual API call)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.success("Registration successful!");
      } catch (error) {
        console.error(error);
        message.error("Registration failed.");
      } finally {
        setIsSubmitting(false); // Reset form submission state
      }
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="register-form-container min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-bg ">
        <h1 className="text-blue-950 text-center text-3xl font-medium">
          ลงทะเบียน
        </h1>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          {/* Name */}
          <Form.Item
            className="flex flex-col mt-5"
            name={["user", "name"]}
            label="ชื่อ-นามสกุล"
            style={{
              formStyle
            }}
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ-นามสกุล",
              },
              {
                validator: (rule, value) => {
                  if (
                    !/^[-a-zA-Z'.ก-๙\s]+$/.test(
                      value
                    )
                  ) {
                    return Promise.reject("กรุณากรอกชื่อ นามสกุลให้ถูกต้อง");
                  }
                  return Promise.resolve();
                },
              }
            ]}
          >
            <Input
              className={inputStyle}
              placeholder="กรุณากรอกชื่อ - นามสกุล"
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            className="mt-5"
            name={["user", "phoneNumber"]}
            label="เบอร์โทรศัพท์"
            style={{
              formStyle
            }}
            rules={[
              {
                required: true,
                message: "กรุณากรอกเบอร์โทรศัพท์",
              },
              {
                validator: (rule, value) => {
                  if (
                    !/^0[6-9]{1}[0-9]{8}$/.test(
                      value
                    )
                  ) {
                    return Promise.reject("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
                  }
                  return Promise.resolve();
                },
              }
            ]}
          >
            <Input
              className={inputStyle}
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            className="mt-5"
            name={["user", "email"]}
            label="อีเมล"
            style={{
              formStyle
            }}
            rules={[
              {
                type: "email",
                message: "กรุณากรอกอีเมลให้ถูกต้อง",
              },
              {
                required: true,
                message: "กรุณากรอกอีเมล",
              },
              {
                validator: (rule, value) => {
                  if (
                    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
                      value
                    )
                  ) {
                    return Promise.reject("กรุณากรอกอีเมลให้ถูกต้อง");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input className={inputStyle} placeholder="กรุณากรอกอีเมล" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            className="mt-5"
            name={["user", "password"]}
            label="รหัสผ่าน"
            style={{
              formStyle
            }}
            rules={[
              {
                required: true,
                message: "กรุณากรอกรหัสผ่าน",
              },
              {
                validator: (rule, value) => {
                  if (
                    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
                      value
                    )
                  ) {
                    return Promise.reject("กรุณากรอกรหัสผ่านให้ถูกต้อง");
                  }
                  if (!/[A-Z]/.test(value)) {
                    return Promise.reject("ต้องมี Uppercase อย่างน้อย 1 ตัว");
                  }
                  if (!/[a-z]/.test(value)) {
                    return Promise.reject("ต้องมี Lowercase อย่างน้อย 1 ตัว");
                  }
                  if (!/[0-9]/.test(value)) {
                    return Promise.reject("ต้องมีตัวเลขอย่างน้อย 1 ตัว");
                  }
                  if (!/[!@#$%^&*]/.test(value)) {
                    return Promise.reject("ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว");
                  }
                  if (value.length < 8) {
                    return Promise.reject("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              className={inputStyle}
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </Form.Item>

          {/* Accept Terms and Conditions */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="mt-5">
              <label className="flex items-center">
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                <span className="ml-2">
                  ยอมรับ{" "}
                  <a href="#" className="underline text-blue-950">
                    ข้อตกลงและเงื่อนไข
                  </a>{" "}
                  และ{" "}
                  <a href="#" className="underline text-blue-950">
                    นโยบายความเป็นส่วนตัว
                  </a>
                </span>
              </label>
            </div>

            <Button
              className={`btn-blue-950 w-full my-5 ${
                !isChecked || isSubmitting
                  ? "disabled:opacity-50 cursor-not-allowed"
                  : ""
              }`}
              htmlType="submit"
              disabled={!isChecked || isSubmitting}
            >
              {isSubmitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
            </Button>
            <div className="text-center">
              <a className="btn-ghost">กลับไปหน้าเข้าสู่ระบบ</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
