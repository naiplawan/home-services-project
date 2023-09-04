import { Button } from "antd";

function Navbar() {
  return (
    <div className="w-1440px flex justify-between p-5 shadow-[2px_2px_24px_rgba(23,51,106,0.12)] sticky top-0 z-[100] bg-white">
      <div className="flex lg:ml-40 items-center">
        <img alt="" /> 
        {/* ใส่รูป */}
        <div className="text-xl font-semibold text-[#336DF2] prompt ml-2 ">
          HomeServices
        </div>
        <div className="items-center text-sm font-bold prompt lg:ml-10 px-3 pt-1.5">
          <Button type="primary">บริการของเรา</Button>
        </div>
      </div>

      <div className="lg:mr-40">
        <Button type="primary" htmlType="submit">
          เข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
