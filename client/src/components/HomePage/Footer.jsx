import HouseIcon from '../../assets/homepagePhoto/HouseIcon.svg'
import LetterIcon from '../../assets/homepagePhoto/LetterIcon.svg'
import Phone from '../../assets/homepagePhoto/Phone.svg'

function Footer () {

  return (
    <footer>
      <div className="flex flex-col gap-5 px-4 py-5 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:py-5 xl:px-40 xl:py-12">
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
      <div className="flex flex-col gap-2 bg-[#EFEFF2] p-3 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-12 xl:px-40">
        <div className="text-[12px] text-grey500">
          copyright © 2021 HomeServices.com All rights reserved
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-grey700 md:text-[14px]">
          <p>เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์</p>
          <p>นโยบายความเป็นส่วนตัว</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
