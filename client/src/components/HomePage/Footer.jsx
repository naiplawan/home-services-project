import HouseIcon from '../../assets/homepagePhoto/HouseIcon.svg'
import LetterIcon from '../../assets/homepagePhoto/LetterIcon.svg'
import Phone from '../../assets/homepagePhoto/Phone.svg'

function Footer () {

  return (
    <div>
      <div className="flex p-12 px-40 justify-evenly">
      <div className="flex items-center">
      <img src={HouseIcon} alt="" className="w-[40px]"/>
        <div className="text-[30px] font-semibold text-[#336DF2] prompt ml-2">
          HomeServices
          </div>
        </div>
      <div>
        <h1 className="text-[18px] font-bold">บริษัท โฮมเซอร์วิสเซส จำกัด</h1>
        <p className="pt-3">452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10260</p>
      </div>
      <div>
        <div className="flex items-center ">
          <img src={Phone} alt="" className="w-[20px]"/>
          <p className="ml-3">080-540-6357</p>
        </div>
        <div className="flex items-center pt-3">
          <img src={LetterIcon} alt="" className="w-[20px]"/>
          <p className="ml-3">contact@homeservices.co</p>
        </div>
      </div>
      </div>
      <div className="bg-[#EFEFF2] flex justify-between p-2 px-40">
      <div className="text-[12px] text-gray-400">copyright © 2021 HomeServices.com All rights reserved</div>
      <div className="flex text-[14px] text-gray-700">
        <p className="mr-5">เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์</p>
        <p>นโยบายความเป็นส่วนตัว</p>
      </div>
      </div>
    </div>
  )
}

export default Footer;