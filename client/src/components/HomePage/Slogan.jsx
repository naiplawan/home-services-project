import BlueMan from "../../assets/homepagePhoto/blueMan.png";
import assetUrl from "../../assets/assetUrl.js";
import { useNavigate } from "@/routing/navigation.jsx";
import { buttonStyles } from "@/lib/ui-classes.js";


function Slogan () {

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-between bg-[#E7EEFF] md:flex-row">
      {/* right side */}
      <div className="p-4 sm:p-6 md:flex-1 md:py-10 lg:py-20 xl:ml-30">
        <div className="text-[clamp(1.35rem,4vw,4rem)] font-prompt font-bold text-[#1852D6] xl:ml-40">
          เรื่องบ้าน...ให้เราช่วยดูแลคุณ
        </div>
        <div className="text-xl font-prompt font-bold text-[#000000] sm:text-2xl lg:text-[30px] xl:ml-40 xl:text-[42px]">
          “สะดวก ราคาคุ้มค่า เชื่อถือได้“
        </div>
        <div className="mt-4 text-sm text-[#646C80] sm:text-base lg:mt-10 lg:text-[20px] xl:ml-40 xl:text-[24px]">
          ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน<br />โดยพนักงานแม่บ้าน และช่างมืออาชีพ
        </div>
        <div className="mt-6 lg:mt-20 xl:ml-40 xl:mt-12">
          <button className={buttonStyles.primary}
          onClick={() => navigate("/services-list")}>
            เช็คราคาบริการ
          </button>
        </div>
      </div>

      {/* left side */}
      <div className="flex justify-center px-6 md:w-2/5 md:items-end md:px-0 lg:absolute lg:bottom-0 lg:right-0 xl:right-20">
        <img src={assetUrl(BlueMan)} alt="blueman" className="w-full max-w-sm md:max-w-none"/>
      </div>
    </div>
  )
}


export default Slogan;
