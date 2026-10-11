import { useNavigate } from "@/routing/navigation.jsx";
import { useAuth } from "../../contexts/authentication";
import image from "../../assets/AdminPhoto/imageIndex";


function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();   
return (
    <aside className="left-nav fixed top-0 z-50 h-dvh w-14 overflow-y-auto bg-blue950 pb-20 shadow-[inset_-1px_0px_0px_#3e3e3e] sm:w-16 lg:w-60">
      <div>
        <div className="my-8 flex justify-center px-1 lg:px-0">
          <div
            className="relative h-12 w-10 cursor-pointer rounded-xl bg-blue100 px-2.5 py-2 lg:w-48"
            onClick={() => navigate("/")}
          >
            <img
              alt="HomeServices Logo"
              className="w-7 h-7 absolute "
              src={image.logoHomeService}
            />
            <p className="absolute ml-8 hidden whitespace-nowrap text-xl font-medium text-blue500 lg:block">
              HomeServices
            </p>
          </div>
        </div>
        <div>
          <div
            className="my-1 flex h-12 cursor-pointer items-center justify-center hover:bg-blue900 lg:justify-start"
            onClick={() => navigate("/admin-category")}
          >
            <img
              className="inline-block w-5 shrink-0 lg:ml-7 lg:mr-2"
              src={image.category}
              alt="หมวดหมู่"
            />
            <button aria-label="หมวดหมู่" className="hidden h-14 text-base font-medium text-grey100 no-underline hover:text-white lg:block">
              หมวดหมู่
            </button>
          </div>
          <div
            className="my-1 flex h-12 cursor-pointer items-center justify-center hover:bg-blue900 lg:justify-start"
            onClick={() => navigate("/admin-service")}
          >
            <img
              className="inline-block h-6 shrink-0 lg:ml-7 lg:mr-1"
              src={image.service}
              alt="บริการ"
            />
            <button aria-label="บริการ" className="hidden h-14 text-base font-medium text-grey100 no-underline hover:text-white lg:block">
              บริการ
            </button>
          </div>
          <div className="my-1 flex h-12 cursor-pointer items-center justify-center hover:bg-blue900 lg:justify-start" onClick={() => navigate("/admin-promotion")}>
          <img
              className="inline-block h-6 shrink-0 lg:ml-7 lg:mr-1"
              src={image.coupon}
              alt="โปรโมชั่น"
            />
            <button aria-label="Promotion Code" className="hidden h-14 text-base font-medium text-grey100 no-underline hover:text-white lg:block">
              Promotion Code
            </button>
          </div>
          <div>
            <div className="absolute bottom-5 left-0 my-1 flex h-12 w-14 cursor-pointer items-center justify-center pt-3 hover:bg-blue900 sm:w-16 lg:w-60 lg:justify-start" onClick={() => {
                  logout();
                }}>
              <img
                className="inline-block shrink-0 lg:ml-7 lg:mr-2"
                src={image.logout}
                alt="Logout"
              />
              <button aria-label="ออกจากระบบ" className="hidden h-14 text-base font-medium text-grey100 no-underline hover:text-white lg:block">
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
