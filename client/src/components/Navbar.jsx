import HouseIcon from '../assets/HouseIcon.svg';
import { useNavigate } from "@/routing/navigation.jsx";
import { buttonStyles } from "@/lib/ui-classes.js";
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
    <div className="sticky top-0 z-[100] flex items-center justify-between gap-1 bg-white px-2 py-3 shadow-[2px_2px_24px_rgba(23,51,106,0.12)] sm:gap-4 sm:p-5">
      <div className="flex min-w-0 items-center">
        <img src={HouseIcon} alt="" className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
        <button className="ml-1 whitespace-nowrap text-sm font-semibold text-[#336DF2] prompt sm:ml-2 sm:text-2xl" onClick={() => navigate('/')}>
          HomeServices
        </button>
        <div className="items-center whitespace-nowrap px-1 pt-1.5 text-xs font-bold prompt sm:ml-6 sm:px-3 sm:text-base">
          <button className="cursor-pointer"
            onClick={() => navigate("/services-list")}
            >บริการของเรา</button>
        </div>
      </div>


      <div className="flex shrink-0 items-center">
        {auth.isAuthenticated ? (
          <>
            <p className="mr-2 max-w-20 truncate text-[#646C80] sm:mr-4 sm:max-w-40">{loginName}</p>
            {loginRole === 'admin' ? <div className="relative">
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-grey600 overflow-hidden cursor-pointer">
                <img src={person} className="w-[25px] h-[25px] rounded-full" onClick={() => setOpen(!open)}/>
              </div>
              {open && (
              <div className="absolute right-0 z-20 mt-2 w-52 max-w-[calc(100vw-1.5rem)] rounded-lg bg-white">
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
              <div className="absolute right-0 z-20 mt-2 w-52 max-w-[calc(100vw-1.5rem)] rounded-lg bg-white">
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
            className={`${buttonStyles.secondary} shrink-0 whitespace-nowrap !px-2 !py-1 text-xs sm:!px-4 sm:!py-2.5 sm:text-base`}
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
