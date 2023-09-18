import HouseIcon from '../../assets/homepagePhoto/HouseIcon.svg'
import LetterIcon from '../../assets/homepagePhoto/LetterIcon.svg'
import Phone from '../../assets/homepagePhoto/Phone.svg'

function Footer () {

  return (
    <footer>
      <div className="flex py-2 lg:py-5 xl:p-12 xl:px-40 justify-between">
      <div className="flex items-center">
      <img src={HouseIcon} alt="" className="w-[40px] hidden xl:block"/>
        <div className="lg:text-[30px] font-semibold text-[#336DF2] prompt md:ml-2">
          HomeServices
          </div>
        </div>
      <div className="">
        <h1 className="lg:text-[18px] font-bold">บริษัท โฮมเซอร์วิสเซส จำกัด</h1>
        <p className="lg:pt-3 text-[10px] md:text-[16px]">452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10260</p>
      </div>
      <div className="">
        <div className="flex ">
          <img src={Phone} alt="" className="w-[12px] lg:w-[20px]"/>
          <p className="text-[12px] lg:text-[18px] xl:ml-3">080-540-6357</p>
        </div>
        <div className="flex items-center pt-3">
          <img src={LetterIcon} alt="" className="w-[12px] lg:w-[20px] hidden sm:block"/>
          <p className="xl:ml-3 text-[12px] lg:text-[18px]">contact@homeservices.co</p>
        </div>
      </div>
      </div>
      <div className="bg-[#EFEFF2] flex justify-between p-2 md:px-40">
        <div className="text-[12px] text-grey500">
          copyright © 2021 HomeServices.com All rights reserved
        </div>
        <div className="flex text-[10px] md:text-[14px] text-grey700">
          <p className="ml-6">เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์</p>
          <p className="ml-6">นโยบายความเป็นส่วนตัว</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;