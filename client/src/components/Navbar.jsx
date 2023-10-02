import HouseIcon from '../assets/HouseIcon.svg';
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/authentication";
import person from '../assets/homepagePhoto/person.svg'
import form from '../assets/homepagePhoto/form.svg'
import watch from '../assets/homepagePhoto/watch.svg'
import exit from '../assets/homepagePhoto/exit.svg'
import bell from '../assets/homepagePhoto/bell.svg'
import { useState } from 'react'

function Navbar () {
  const [open, setOpen] = useState(false);
  const loginRole = localStorage.getItem("role");
  const loginName = localStorage.getItem("fullName");
  const { logout } = useAuth();
  const auth = useAuth();
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");


  return (
    <div className="flex justify-between p-5 shadow-[2px_2px_24px_rgba(23,51,106,0.12)] sticky top-0 z-[100] bg-white">
      <div className="flex lg:ml-40 items-center">
        <img src={HouseIcon} alt="" />
        <button className="text-2xl font-semibold text-[#336DF2] prompt ml-2" onClick={() => navigate('/')}>
          HomeServices
        </button>
        <div className="items-center text-base font-bold prompt lg:ml-10 px-3 pt-1.5">
          <button className="cursor-pointer"
            onClick={() => navigate("/services-list")}
            >บริการของเรา</button>
        </div>
      </div>


      <div className="lg:mr-40 flex items-center">
        {auth.isAuthenticated ? (
          <>
            <p className="mr-4 text-[#646C80]">{loginName}</p>
            {loginRole === 'admin' ? <div className="relative">
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-grey600 overflow-hidden cursor-pointer">
                <img src={person} className="w-[25px] h-[25px] rounded-full" onClick={() => setOpen(!open)}/>
              </div>
              {open && (
              <div className="absolute right-0 mt-2 bg-white w-[200px] rounded-lg">
                <ul className="flex flex-col shadow-2xl self-stretch rounded-lg text-[#4B5160] overflow-hidden">
                <button className="flex p-2 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={()=> navigate("/profile")}><span><img src={person} className="mr-3 "/></span>ข้อมูลผู้ใช้งาน</button>
                <button className="flex p-1 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={() => navigate(`/customer-ordered-list/${userId}`)}><span><img src={form} className="mr-3"/></span>รายการคำสั่งซ่อม</button>
                <button className="flex pt-2 p-1 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={() => navigate(`/customer-ordered-history/${userId}`)}><span><img src={watch} className="mr-3"/></span>ประวัติการซ่อม</button>
                <button className="flex pt-2 p-1 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={()=> navigate("/admin-category")}><span ><img src={watch} className="mr-3" /></span >Admin Dashboard</button>
                <button className="flex pt-2 p-2 border-t border-grey300 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={logout}><span><img src={exit} className="mr-3"/></span>ออกจากระบบ</button>
              </ul>
              </div>
              )}
            </div> 
            : 
            <div className="relative">
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-grey600 overflow-hidden cursor-pointer">
                <img src={person} className="w-[25px] h-[25px] rounded-full" onClick={() => setOpen(!open)}/>
              </div>
              {open && (
              <div className="absolute right-0 mt-2 bg-white w-[200px] rounded-lg">
                <ul className="flex flex-col shadow-2xl self-stretch rounded-lg text-[#4B5160] overflow-hidden">
                <button className="flex p-2 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={()=> navigate("/profile")}><span><img src={person} className="mr-3 "/></span>ข้อมูลผู้ใช้งาน</button>
                <button className="flex p-1 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={() => navigate(`/customer-ordered-list/${userId}`)}><span><img src={form} className="mr-3"/></span>รายการคำสั่งซ่อม</button>
                <button className="flex pt-2 p-1 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={() => navigate(`/customer-ordered-history/${userId}`)}><span><img src={watch} className="mr-3"/></span>ประวัติการซ่อม</button>
                <button className="flex pt-2 p-2 border-t border-grey300 hover:bg-[#EFEFF2] hover:text-[#232630]" onClick={logout}><span><img src={exit} className="mr-3"/></span>ออกจากระบบ</button>
              </ul>
              </div>
              )}
            </div>
            }
            <div className="flex items-center justify-center w-[30px] h-[30px] ml-3 rounded-full border-grey600 cursor-pointer">
              <img src={bell} className="w-[30px] h-[30px] rounded-full bg-grey100"/>
            </div>
          </>
        ) : (
          <button
            className="btn-secondary"
            onClick={() => navigate("/login")}
          >
            เข้าสู่ระบบ
          </button>
        )}

      </div>
    </div>
  );
}

export default Navbar;