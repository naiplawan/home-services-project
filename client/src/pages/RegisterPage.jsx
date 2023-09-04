import { Button, Form, Input, Checkbox } from "antd";
import Navbar from "../components/Navbar";

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    phonenumber: "${label} is not a valid phone number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function onFinish(values) {
  console.log(values);
}

function RegisterPage() {
  return (
    <div className="register-form-container">
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-bg ">
        <h1 className="text-blue950 text-center text-[32px] font-medium">
          ลงทะเบียน
        </h1>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item
            className="mt-5 "
            name={["user", "name"]}
            label="ชื่อ-นามสกุล"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ-นามสกุล",
              },
              {
                pattern: /^[-a-zA-Z'.]+ [-a-zA-Z'.]+$/,
                message: "กรุณากรอกชื่อ นามสกุลให้ถูกต้อง",
              },
            ]}
          >
            <Input
              className="border rounded-lg border-grey300 w-full h-11 px-4 py-2.5"
              placeholder="กรุณากรอกชื่อ - นามสกุล"
            />
          </Form.Item>

          {/* Remove duplicate email field or update its label */}

          <Form.Item
            className="mt-5"
            name={["user", "phonenumber"]}
            label="เบอร์โทรศัพท์"
            rules={[
              {
                required: true,
                message: "กรุณากรอกเบอร์โทรศัพท์",
              },
              {
                pattern: /^0[6-9]{1}[0-9]{8}$/,
                message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
              },
            ]}
          >
            <Input
              className="border rounded-lg border-grey300 w-full h-11 px-4 py-2.5"
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
            />
          </Form.Item>

          <Form.Item
            className="mt-5"
            name={["user", "email"]}
            label="อีเมล"
            rules={[
              {
                type: "email",
                message: "กรุณากรอกอีเมลให้ถูกต้อง",
              },
              {
                required: true,
                message: "กรุณากรอกอีเมล",
              },
            ]}
          >
            <Input
              className="border rounded-lg border-grey300 w-full h-11 px-4 py-2.5"
              placeholder="กรุณากรอกอีเมล"
            />
          </Form.Item>

          {/* Add password validation rules */}
          <Form.Item
            className="mt-5"
            name={["user", "password"]}
            label="รหัสผ่าน"
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
                    return Promise.reject(
                      "กรุณากรอกรหัสผ่านให้ถูกต้อง"
                    );
                  }
                  if (value.length < 8) {
                    return Promise.reject(
                      "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              className="border rounded-lg border-grey300 w-full h-11 px-4 py-2.5"
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="mt-[30px]">
              <Checkbox>
                ยอมรับ{" "}
                <a href="#" className="underline text-blue950">
                  ข้อตกลงและเงื่อนไข
                </a>{" "}
                และ{" "}
                <a href="#" className="underline text-blue950">
                  นโยบายความเป็นส่วนตัว
                </a>
              </Checkbox>
            </div>

            <Button
              className="btn-primary w-full my-[30px]"
              htmlType="submit"
            >
              ลงทะเบียน
            </Button>
            <div className="text-center">
              <button className="btn-ghost">
                กลับไปหน้าเข้าสู่ระบบ
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
