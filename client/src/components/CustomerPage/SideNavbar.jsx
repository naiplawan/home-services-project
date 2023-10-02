import image from "../../assets/CustomerPhoto/imageIndex.js";
import orderIcon from "../../assets/homepagePhoto/form.svg";
import { useNavigate } from "react-router-dom";

function SideNavbar () {
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();
    
    return (
        <aside className="h-full w-[18vw] border border-grey300 rounded-lg pt-6 pb-6 bg-white mb-10 sticky top-[120px]" >
            <div className="text-grey700 text-xl font-normal leading-normal ml-6">
              บัญชีผู้ใช้
            </div>
            <hr className="text-grey300 my-3 mx-6" />
            <nav className="w.full">
                <div 
                    className="flex w-full justify-between items-center h-10 my-2 cursor-pointer hover:bg-grey100 hover:bg-opacity-50 hover:text-grey950"
                    onClick={() => navigate("/profile")}
                >
                    <img className="w-6 h-6 ml-6" src={image.personIcon} alt="Person Icon" />
                    <p className="w-full text-grey900 font-normal no-underline ml-4">
                        ข้อมูลผู้ใช้งาน
                    </p>
                </div>
                <div 
                    className="flex w-full justify-between my-2 items-center h-10 cursor-pointer hover:bg-grey100 hover:bg-opacity-50 hover:text-grey950"
                    onClick={() => navigate(`/customer-ordered-list/${userId}`)}
                >
                    <img className="w-6 h-6 ml-6" alt="Time" src={orderIcon} />
                    <p className="w-full text-grey950 font-normal no-underline ml-4 ">
                        รายการคำสั่งซ่อม
                    </p>
                </div>
                <div 
                    className="flex w-full justify-between items-center h-10 my-2 cursor-pointer hover:bg-grey100 hover:bg-opacity-50 hover:text-grey950" 
                    onClick={() => navigate(`/customer-ordered-history/${userId}`)}
                >
                    <img className="w-6 h-6 ml-6" alt="Time" src={image.time} />
                    <p className="w-full text-grey950 font-normal no-underline ml-4 ">
                      ประวัติการซ่อม
                    </p>
                </div>
            </nav>
        </aside>
    );
}

export default SideNavbar