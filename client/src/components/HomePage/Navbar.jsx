import HouseIcon from '../../assets/homepagePhoto/HouseIcon.jsx'

function Navbar () {

  return(
    
      <div className="flex justify-between p-5 shadow-md">
        <div className="flex ml-40">
        <HouseIcon />
        <div className="text-xl font-semibold text-[#336DF2] prompt">HomeServices</div>
        <div className="center-text text-sm font-bold prompt ml-10 p-1">บริการของเรา</div>
        </div>

        <div>
          <button className="prompt text-sm font-bold text-[#336DF2] border border-[#336DF2] w-[100px] h-[35px] rounded-lg mr-40">เข้าสู่ระบบ</button>
        </div>
      </div>
    
    
  )
}

export default Navbar;