import image from "../../assets/CustomerPhoto/imageIndex.js";
import orderIcon from "../../assets/homepagePhoto/form.svg";
import { useNavigate } from "@/routing/navigation.jsx";

function SideNavbar () {
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();
    
    return (
        <aside className="mb-2 w-full rounded-lg border border-grey300 bg-white p-3 md:sticky md:top-[120px] md:mb-10 md:h-full md:w-[18vw] md:shrink-0 md:px-6 md:py-6">
            <div className="ml-2 text-lg font-normal leading-normal text-grey700 md:ml-0 md:text-xl">
              บัญชีผู้ใช้
            </div>
            <hr className="mx-2 my-3 text-grey300 md:mx-0" />
            <nav className="flex flex-col">
                <div 
                    className="my-1 flex h-10 w-full cursor-pointer items-center gap-3 rounded px-2 hover:bg-grey100 hover:bg-opacity-50 hover:text-grey950 md:gap-4 md:px-0"
                    onClick={() => navigate("/profile")}
                >
                    <img className="h-6 w-6 shrink-0 md:ml-2" src={image.personIcon} alt="Person Icon" />
                    <p className="w-full text-grey900 font-normal no-underline">
                        ข้อมูลผู้ใช้งาน
                    </p>
                </div>
                <div 
                    className="my-1 flex h-10 w-full cursor-pointer items-center gap-3 rounded px-2 hover:bg-grey100 hover:bg-opacity-50 hover:text-grey950 md:gap-4 md:px-0"
                    onClick={() => navigate(`/customer-ordered-list/${userId}`)}
                >
                    <img className="h-6 w-6 shrink-0 md:ml-2" alt="Time" src={orderIcon} />
                    <p className="w-full text-grey950 font-normal no-underline">
                        รายการคำสั่งซ่อม
                    </p>
                </div>
                <div 
                    className="my-1 flex h-10 w-full cursor-pointer items-center gap-3 rounded px-2 hover:bg-grey100 hover:bg-opacity-50 hover:text-grey950 md:gap-4 md:px-0"
                    onClick={() => navigate(`/customer-ordered-history/${userId}`)}
                >
                    <img className="h-6 w-6 shrink-0 md:ml-2" alt="Time" src={image.time} />
                    <p className="w-full text-grey950 font-normal no-underline">
                      ประวัติการซ่อม
                    </p>
                </div>
            </nav>
        </aside>
    );
}

export default SideNavbar
