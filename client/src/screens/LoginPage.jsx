import { Form, Input } from "antd";
import { useNavigate } from "@/routing/navigation.jsx";
import { buttonStyles } from "@/lib/ui-classes.js";
import Navbar from "../components/Navbar.jsx";
import { notify } from "@/components/ui/notify.js";
import { useAuth } from "../contexts/authentication";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  

  const onFinish = async (values) => {
    try {
     
      console.log(values);
      const response = await login(values);
      console.log("Response:", response)
  
      if (response.success) {
        navigate("/");
      } else {
        notify.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const inputStyle = "border rounded-lg border-grey300 w-[100%] h-11 px-4 py-2.5";

  const formStyle =
    "mx-4 my-8 flex w-full max-w-[740px] flex-col items-center gap-4 rounded-lg border border-grey300 bg-white px-4 pb-8 pt-6 sm:mx-6 sm:my-12 sm:px-8 lg:px-[87px] lg:pb-[53px] lg:pt-[32px]";

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
      <div className="flex flex-col">
        <Navbar />
        <div className="flex min-h-screen w-full justify-center bg-bg px-2 sm:px-4">
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className={formStyle}
          >
            <h1 className="text-blue950 text-center text-[32px] font-medium">
              เข้าสู่ระบบ
            </h1>
            <Form.Item
              className="min-h-[72px] w-full"
              label={<span style={labelStyle}>อีเมล</span>}
              name="email"
              labelAlign="top"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกอีเมล",
                },
              ]}
            >
              <Input className={inputStyle} placeholder="กรุณากรอกอีเมล" />
            </Form.Item>

            <Form.Item
              className="min-h-[72px] w-full"
              label={<span style={labelStyle}>รหัสผ่าน</span>}
              labelAlign="top"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกรหัสผ่าน",
                },
              ]}
            >
              <Input.Password
                className={inputStyle}
                placeholder="กรุณากรอกรหัสผ่าน"
              />
            </Form.Item>

            <Form.Item style={{textAlign: 'center'}}>
              <button  
              className={`${buttonStyles.primary} mb-5 mt-5 w-full`}
              type="submit">
                เข้าสู่ระบบ
              </button>
            </Form.Item>
            <div className="text-center">
              <span className="text-base text-grey700">
                ยังไม่มีบัญชีผู้ใช้ HomeServices?
              </span>
              <a className={buttonStyles.ghost} onClick={handleRegisterClick}>
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
