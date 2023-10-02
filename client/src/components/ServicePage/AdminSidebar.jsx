import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import image from "../../assets/AdminPhoto/imageIndex";


function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();   
return (
    <div className="left-nav w-60 h-screen bg-blue950 top-0 z-50 fixed pb-20 shadow-[inset_-1px_0px_0px_#3e3e3e]">
      <div>
        <div className="flex justify-center my-8">
          <div
            className="py-2 px-2.5 bg-blue100 rounded-xl w-48 h-12 cursor-pointer relative"
            onClick={() => navigate("/")}
          >
            <img
              alt="HomeServices Logo"
              className="w-7 h-7 absolute "
              src={image.logoHomeService}
            />
            <p className=" text-blue500 font-medium text-xl absolute ml-8">
              HomeServices
            </p>
          </div>
        </div>
        <div>
          <div
            className="hover:bg-blue900 h-12 my-1 cursor-pointer flex items-center"
            onClick={() => navigate("/admin-category")}
          >
            <img
              className="inline-block w-5 mr-2 ml-7"
              src={image.category}
              alt="หมวดหมู่"
            />
            <button className="h-14 text-grey100 font-medium text-base no-underline hover:text-white">
              หมวดหมู่
            </button>
          </div>
          <div
            className="hover:bg-blue900 h-12 my-1 cursor-pointer flex items-center"
            onClick={() => navigate("/admin-service")}
          >
            <img
              className="inline-block h-6 mr-1 ml-7"
              src={image.service}
              alt="บริการ"
            />
            <button className="h-14 text-grey100 font-medium text-base no-underline hover:text-white">
              บริการ
            </button>
          </div>
          <div className="hover:bg-blue900 h-12 my-1 cursor-pointer flex items-center" onClick={() => navigate("/admin-promotion")}>
          <img
              className="inline-block h-6 mr-1 ml-7"
              src={image.coupon}
              alt="โปรโมชั่น"
            />
            <button className="h-14 text-grey100 font-medium text-base no-underline hover:text-white">
              Promotion Code
            </button>
          </div>
          <div>
            <div className="hover:bg-blue900 h-12 my-1 cursor-pointer pt-3 absolute bottom-5 w-60" onClick={() => {
                  logout();
                }}>
              <img
                className="inline-block mr-2 ml-7"
                src={image.logout}
                alt="Logout"
              />
              <button className="h-14 text-grey100 font-medium text-base no-underline hover:text-white">
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;