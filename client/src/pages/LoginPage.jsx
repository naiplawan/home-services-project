import { Button, Form, Input } from "antd";
import Navbar from "../components/NavBar";

function LoginForm() {
 

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Navbar/>
      <div className="form-container">
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
        >
          <div>
            <h1>เข้าสู่ระบบ</h1>
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

          {/* <Form.Item
   name="remember"
   valuePropName="checked"
   wrapperCol={{
     offset: 8,
     span: 16,
   }}
 >
   <Checkbox>Remember me</Checkbox>
 </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              เข้าสู่ระบบ
            </Button>
            {/* ต้องมี state มารองรับ */}
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default LoginForm;
