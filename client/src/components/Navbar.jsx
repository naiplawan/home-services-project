import HouseIcon from '../assets/HouseIcon.svg';

function Navbar () {

  return(
    
      <div className="flex justify-between p-5 shadow-[2px_2px_24px_rgba(23,51,106,0.12)] sticky top-0 z-[100] bg-white">
        <div className="flex lg:ml-40 items-center">
        <img src={HouseIcon} alt=""/>
        <div className="text-xl font-semibold text-[#336DF2] prompt ml-2 ">
          HomeServices
          </div>
        <div className="items-center text-sm font-bold prompt lg:ml-10 px-3 pt-1.5">
          <button className="cursor-pointer">
            บริการของเรา
            </button>
          </div>
        </div>

        <div className="lg:mr-40">
          <button className="prompt text-sm font-bold text-[#336DF2] border border-[#336DF2] w-[100px] h-[35px] rounded-lg ">เข้าสู่ระบบ</button>
        </div>
      </div>
    
    
  )
}

export default Navbar;