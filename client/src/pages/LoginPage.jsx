import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/authentication";

function LoginForm() {


  const { login } = useAuth();
  const navigate = useNavigate();


  const onFinish = async (values) => {

    try {
      console.log(values);
      await login(values);
    } catch (error) {
      console.error("Login failed:", error)
    }
  
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex w-1440px min-h-screen  justify-center bg-bg ">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="bg-white border border-grey300 rounded-lg w-[614px] h-full mt-[52px] mb-[87px] px-[87px] pt-[32px] pb-[53px]"
          >
            <div className="flex w-217 h-47 flex-col justify-center flex-shrink-0 text-blue-500 text-center font-Prompt font-medium text-24">
              <h1 className="text-blue950 text-center text-[32px] font-medium">
                เข้าสู่ระบบ
              </h1>
            </div>
            <Form.Item
              label="อีเมล"
              name="email"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกอีเมล",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* validate email */}

            <Form.Item
              label="รหัสผ่าน"
              name="password"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกรหัสผ่าน",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* validate password  */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                เข้าสู่ระบบ
              </Button>
              {/* ต้องมี state มารองรับ เพื่อ navigate ไปหน้า userdashboard or admindashboard*/}
            </Form.Item>
            <div>
              <span className="text-gray-700">
                ยังไม่มีบัญชีผู้ใช้ HomeServices?
              </span>
              <a onClick={handleRegisterClick}>
                <span className="underline">ลงทะเบียน</span>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

//edit commit

export default LoginForm;
