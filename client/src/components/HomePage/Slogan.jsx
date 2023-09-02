import BlueMan from "../../assets/homepagePhoto/BlueMan.png";


function Slogan () {

  return (
    <div className="flex justify-between bg-[#E7EEFF] relative">
      <div className="p-20 lg:ml-40">
        <div className="text-[#1852D6] lg:text-[64px] prompt-Bold lg:ml-40">เรื่องบ้าน...ให้เราช่วยดูแลคุณ</div>
        <div className="text-[#000000] font-bold lg:text-[42px] prompt-Bold lg:ml-40">“สะดวก ราคาคุ้มค่า เชื่อถือได้“</div>
        <div className="text-[#646C80] lg:text-[24px] lg:ml-40 lg:mt-10">ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน<br />โดยพนักงานแม่บ้าน และช่างมืออาชีพ
        </div>
        <div className="lg:ml-40 lg:mt-12"> 
          <button className="text-white bg-[#336DF2] py-3 px-7 rounded-lg">
            เช็คราคาบริการ
          </button>
        </div>
      </div>
    <div className="lg:absolute bottom-0 right-80">
      <img src={BlueMan} alt="blueman" />
    </div>
    </div>
  )
}


export default Slogan;