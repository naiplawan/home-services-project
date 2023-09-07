import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import { useAuth } from "../contexts/authentication";
import "../styles/App.css";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log(values);
      await login(values);
    } catch (error) {
      console.error("Login failed:", error);
      message.error("เข้าสู่ระบบล้มเหลว");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const inputStyle = "border rounded-lg border-gray-300 w-440 h-11 px-4 py-2.5";

  const formStyle =
    "bg-white border border-grey300 rounded-lg h-full mt-[52px] mb-[87px] px-[87px] pt-[32px] pb-[53px]  w-614px items-center gap-4";

  const labelStyle = {
    color: "var(--gray-900, #323640)",
    fontFamily: "Prompt",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%", // 24px
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex w-1440px min-h-screen justify-center bg-bg ">
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={formStyle}
          >
            <h1 className="text-blue950 text-center text-[32px] font-medium">
              เข้าสู่ระบบ
            </h1>
            <Form.Item
              className="w-440px h-72px"
              label={<span style={labelStyle}>อีเมล</span>}
              name="email"
              labelAlign="top" // Use labelAlign to position the label on top
              labelCol={{ span: 24 }} // Set the label column to take up the full width
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกอีเมล",
                },
                {
                  validator: (rule, value) => {
                    if (
                      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(
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

            <Form.Item
              className="w-440px h-72px"
              label={<span style={labelStyle}>รหัสผ่าน</span>}
              labelAlign="top"
              name="password"
              labelCol={{ span: 24 }}
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
                className={inputStyle}
                placeholder="กรุณากรอกรหัสผ่าน"
              />
            </Form.Item>

            <Form.Item style={{textAlign: 'center'}}>
              <button  className="btn-primary">
                เข้าสู่ระบบ
              </button>
            </Form.Item>
            <div className="text-center">
              <span className="text-gray-700">
                ยังไม่มีบัญชีผู้ใช้ HomeServices?
              </span>
              <a className="btn-ghost" onClick={handleRegisterClick}>
                <span className="underline">ลงทะเบียน</span>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;