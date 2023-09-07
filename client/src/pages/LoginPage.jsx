<<<<<<< HEAD
// import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { useAuth } from "../contexts/authentication";

// function LoginForm() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     try {
//       console.log(values);
//       await login(values);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleRegisterClick = () => {
//     navigate("/register");
//   };

//   return (
//     <>
//       <div className="flex flex-col">
//         <Navbar />
//         <div className="flex w-1440px min-h-screen  justify-center bg-bg ">
//           <Form
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             style={{
//               maxWidth: 600,
//             }}
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//             className="bg-white border border-grey300 rounded-lg w-[614px] h-full mt-[52px] mb-[87px] px-[87px] pt-[32px] pb-[53px]"
//           >
//             <div className="flex w-217 h-47 flex-col justify-center flex-shrink-0 text-blue-500 text-center font-Prompt font-medium text-24 ">
//               <h1 className="text-blue950 text-center text-[32px] font-bold prompt ">
//                 เข้าสู่ระบบ
//               </h1>
//             </div>
//             <Form.Item
//               className="pt-5 items-center"
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "กรุณากรอกอีเมล",
//                 },
//               ]}
//             >
//               <div className="prompt">
//                 <span className="text-red font-bold text-[15px] ">*</span> อีเมล
//               </div>
//               <Input placeholder="กรุณากรอกอีเมล" className="w-[400px]" />
//             </Form.Item>
//             {/* validate email */}

//             <Form.Item
//               className="items-center"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "กรุณากรอกรหัสผ่าน",
//                 },
//               ]}
//             >
//               <div className="prompt">
//                 <span className="text-red font-bold text-[15px] ">*</span>{" "}
//                 รหัสผ่าน
//               </div>
//               <Input.Password
//                 placeholder="กรุณากรอกรหัสผ่าน"
//                 className="w-[400px]"
//               />
//             </Form.Item>
//             {/* validate password  */}

//             <Form.Item
//               wrapperCol={{
//                 offset: 2,
//                 span: 18,
//               }}
//             >
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="bg-[#336DF2] min-w-full "
//               >
//                 เข้าสู่ระบบ
//               </Button>
//               {/* ต้องมี state มารองรับ เพื่อ navigate ไปหน้า userdashboard or admindashboard*/}
//             </Form.Item>
//             <div>
//               <span className="text-gray-700 ml-12">
//                 ยังไม่มีบัญชีผู้ใช้ HomeServices?
//               </span>
//               <a onClick={handleRegisterClick}>
//                 <span className="underline text-blue500">ลงทะเบียน</span>
//               </a>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// //edit commit

// export default LoginForm;

// import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { useAuth } from "../contexts/authentication";

// function LoginForm() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     try {
//       console.log(values);
//       await login(values);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleRegisterClick = () => {
//     navigate("/register");
//   };

//   return (
//     <>
//       <div className="flex flex-col">
//         <Navbar />
//         <div className="flex w-1440px min-h-screen  justify-center bg-bg ">
//           <Form
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             style={{
//               maxWidth: 600,
//             }}
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//             className="bg-white border border-grey300 rounded-lg w-[614px] h-full mt-[52px] mb-[87px] px-[87px] pt-[32px] pb-[53px]"
//           >
//             <div className="flex w-217 h-47 flex-col justify-center flex-shrink-0 text-blue-500 text-center font-Prompt font-medium text-24 ">
//               <h1 className="text-blue950 text-center text-[32px] font-medium">
//                 เข้าสู่ระบบ
//               </h1>
//             </div>
//             <Form.Item
//               // className="pt-5 items-center"
//               label="อีเมล"
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "กรุณากรอกอีเมล",
//                 },
//               ]}
//             >
//               <div className="prompt">
//                 <span className="text-red font-bold text-[15px] ">*</span> อีเมล
//               </div>
//               <Input  placeholder="กรุณากรอกอีเมล" className="w-[400px]"/>
//             </Form.Item>
//             {/* validate email */}

//             <Form.Item
//             //  className="items-center"
//               label="รหัสผ่าน"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "กรุณากรอกรหัสผ่าน",
//                 },
//               ]}
//             >
//               <div className="prompt">
//                 <span className="text-red font-bold text-[15px] ">*</span> รหัสผ่าน
//               </div>
//               <Input.Password placeholder="กรุณากรอกรหัสผ่าน" className="w-[400px]" />
//             </Form.Item>
//             {/* validate password  */}

//             <Form.Item
//               wrapperCol={{
//                 offset: 8,
//                 span: 16,
//               }}
//             >
//               <Button type="primary" htmlType="submit" className="bg-[#336DF2] min-w-full">
//                 เข้าสู่ระบบ
//               </Button>
//               {/* ต้องมี state มารองรับ เพื่อ navigate ไปหน้า userdashboard or admindashboard*/}
//             </Form.Item>
//             <div>
//               <span className="text-gray-700 ml-12">
//                 ยังไม่มีบัญชีผู้ใช้ HomeServices?
//               </span>
//               <a onClick={handleRegisterClick}>
//                 <span className="underline text-blue500">ลงทะเบียน</span>
//               </a>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// //edit commit

// export default LoginForm;

=======
>>>>>>> f67a685 (fix:merge conflict solve)
import { Button, Form, Input, message } from "antd";
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

  const formStyle = "flex flex-col w-440px items-start gap-4";

  const labelStyle = {
<<<<<<< HEAD
    color: "var(--gray-900, #323640)",
    fontFamily: "Prompt",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%", // 24px
=======
    color: 'var(--gray-900, #323640)',
    fontFamily: 'Prompt',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '150%', // 24px
>>>>>>> f67a685 (fix:merge conflict solve)
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex w-1440px min-h-screen justify-center bg-bg ">
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="bg-white border border-grey300 rounded-lg w-[614px] h-full mt-[52px] mb-[87px] px-[87px] pt-[32px] pb-[53px]"
          >
            <h1 className="text-blue950 text-center text-[32px] font-medium">
              เข้าสู่ระบบ
            </h1>
            <Form.Item
              className="mt-5"
              label={<span style={labelStyle}>อีเมล</span>}
              name="email"
              style={{
                formStyle,
              }}
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
              className="flex flex-col justify-center items-center mt-5"
              style={{
                formStyle,
              }}
              label={<span style={labelStyle}>รหัสผ่าน</span>}
              name="password"
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

<<<<<<< HEAD
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                htmlType="submit"
                className="btn-primary"
=======
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            >
              <Button
                className="btn-blue-950 w-full my-5"
                type="primary"
                htmlType="submit"
>>>>>>> f67a685 (fix:merge conflict solve)
              >
                เข้าสู่ระบบ
              </Button>
              {/* ต้องมี state มารองรับ เพื่อ navigate ไปหน้า userdashboard or admindashboard*/}
            </Form.Item>
<<<<<<< HEAD
            <div>
              <span className="text-gray-700 ml-12">
=======
            <div className="flex-col text-center ml-12">
              <span className="text-gray-700">
>>>>>>> f67a685 (fix:merge conflict solve)
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

<<<<<<< HEAD
export default LoginForm;
=======
export default LoginForm;
>>>>>>> f67a685 (fix:merge conflict solve)
