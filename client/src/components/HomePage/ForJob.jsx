import Tools from '../../assets/homepagePhoto/tools.png';
import House from '../../assets/homepagePhoto/house.svg';

function ForJob () {

  return (
    <div className="text-white relative">
      <div className="bg-[#336DF2] flex ">
        <img src={Tools} alt="" className="hidden md:block"/>
        <div className="bg-[#336DF2] flex flex-col p-5 lg:pt-10 lg:pl-40 justify-evenly">
      <div className="font-bold text-[40px]">
        มาร่วมเป็นพนักงานซ่อม
        <br/> 
        กับ HomeServices
        </div>
      <div className="text-[18px]">
        เข้ารับการฝึกอบรมที่ได้มาตรฐาน ฟรี! 
        <br/>
        และยังได้รับค่าตอบแทนที่มากขึ้นกว่าเดิม
        </div>
      <div className="text-[32px]">
        ติดต่อมาที่อีเมล: job@homeservices.co
        </div>
      <div className="absolute bottom-0 right-0 hidden sm:block">
        <img src={House} alt="" className="mix-blend-screen"/>
      </div>
      </div>
      </div>
      
    </div>
  )
}


export default ForJob;