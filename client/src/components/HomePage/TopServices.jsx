import Cleaning from '../../assets/homepagePhoto/Cleaning.png';
import Air from '../../assets/homepagePhoto/Air.png';
import Washing from '../../assets/homepagePhoto/Washing.png';
import SellBlack from '../../assets/homepagePhoto/sellBlack.jsx';

function TopServices() {

  return (
   <div className="flex flex-col justify-center items-center top-20 h-full bg-[#f0f0f0]">
    <div className="pt-20">
      <h1 className="text-[#001C59] font-bold text-[32px]">
        บริการยอดฮิตของเรา
        </h1>
        </div>
    <div className="flex justify-between mt-10">
    <div className="rounded-md overflow-hidden border border-[#CCD0D7]">
      <div >
        <img src={Cleaning} alt="cleaning"/>
      </div>
      <div className="p-2 md:p-5 bg-white min-h-full">
        <div className="bg-[#E7EEFF] text-center w-[100px] p-1 text-[#0E3FB0] rounded-lg">
          <p>
            บริการทั่วไป
            </p>
            </div>
        <h2 className="font-bold text-[20px] mt-3">
          ทำความสะอาดทั่วไป
          </h2>
        <div className="flex items-center">
          <SellBlack />
        <p className="ml-2 text-[#646C80]">
          ค่าบริการประมาณ 500.00 - 1,000.00 ฿
          </p>
          </div>
        <div>
          <button className="underline text-[#336DF2] font-bold text-[16px] mt-6">
          เลือกบริการ
          </button>
        </div>
      </div>
    </div>
    <div className="mx-10 rounded-md overflow-hidden border border-[#CCD0D7]">
    <div>
        <img src={Air} alt="air" />
      </div>
      <div className="p-2 md:p-5 bg-white min-h-full">
        <div className="bg-[#E7EEFF] text-center w-[100px] p-1 text-[#0E3FB0] rounded-lg" >
          <p>บริการทั่วไป
            </p>
            </div>
        <h2 className="font-bold text-[20px] mt-3">
          ล้างแอร์
          </h2>
        <div className="flex items-center">
          <SellBlack />
        <p className="ml-2 text-[#646C80]">
          ค่าบริการประมาณ 500.00 - 1,000.00 ฿
          </p>
          </div>
        <div>
          <button className="underline text-[#336DF2] font-bold text-[16px] mt-6">
          เลือกบริการ
          </button>
        </div>
      </div>
    </div>
    <div className="rounded-md overflow-hidden border border-[#CCD0D7]">
    <div>
        <img src={Washing} alt="washing" />
      </div>
      <div className="p-2 md:p-5 bg-white min-h-full">
        <div className="bg-[#E7EEFF] text-center w-[100px] p-1 text-[#0E3FB0] rounded-lg">
          <p>
            บริการทั่วไป
            </p>
            </div>
        <h2 className="font-bold text-[20px] mt-3">
          ซ่อมเครื่องซักผ้า
          </h2>
        <div className="flex items-center">
          <SellBlack />
          <p className="ml-2 text-[#646C80]">
          ค่าบริการประมาณ 500.00 ฿
          </p>
          </div>
        <div className="bg-white">
          <button className="underline text-[#336DF2] font-bold text-[16px] mt-6 bg-white">
          เลือกบริการ
          </button>
        </div>
      </div>
    </div>
    </div>
    <div className="pt-12 pb-40">
      <button className="text-white bg-[#336DF2] py-2 px-6 rounded-lg">
      ดูบริการท้ังหมด
      </button></div>
   </div>
  )
}

export default TopServices;