import HouseIcon from '../../assets/homepagePhoto/HouseIcon.svg';

function Navbar () {

  return(
    
      <div className="flex justify-between p-5 shadow-[2px_2px_24px_rgba(23,51,106,0.12)] sticky top-0 z-[100] bg-white">
        <div className="flex ml-40 items-center">
        <img src={HouseIcon} alt=""/>
        <div className="text-xl font-semibold text-[#336DF2] prompt ml-2">
          HomeServices
          </div>
        <div className="center-text text-sm font-bold prompt ml-10 p-2">
          <button className="cursor-pointer">
            บริการของเรา
            </button>
          </div>
        </div>

        <div>
          <button className="prompt text-sm font-bold text-[#336DF2] border border-[#336DF2] w-[100px] h-[35px] rounded-lg mr-40">เข้าสู่ระบบ</button>
        </div>
      </div>
    
    
  )
}

export default Navbar;