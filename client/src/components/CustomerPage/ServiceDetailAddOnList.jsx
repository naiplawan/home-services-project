// หน้าที่มีการเลือกรายการ และมีกล่องสรุปรายการด้านข้าง
// ex 9000 - 18000 BTU แบบติดผนัง - +
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import arrowblue from "../../assets/CustomerPhoto/icons/arrowblue.svg";
import goarrow from "../../assets/CustomerPhoto/icons/goarrow.svg";
import axios from "axios";
import greyarrow from "../../assets/CustomerPhoto/icons/greyarrow.svg";
import { Steps } from 'antd';


function ServiceDetailAddOnlist() {
  const [service, setService] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  console.log("params.serviceId:", params.serviceId);

  const stepsData = [
    {
      title: 'รายการ', 
    },
    {
      title: 'กรอกข้อมูลบริการ',
    },
    {
      title: 'ชำระเงิน',
    },
  ];

  const currentStep = 0;

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/service/${serviceId}`
      );
      const serviceData = response.data.data;

      if (serviceData) {
        setService(serviceData);
      } else {
        // Handle the case where the data is not valid
        console.error("Service data is not valid:", serviceData);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };
  

  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);

  return (
    <div>
      <Navbar />
      <div className="">
        <img src={service.service_photo} />
        <div className="rounded-lg px-[10px] py-[10px] w-[300px] h-[68px] text-center text-[#646C80] shadow-md bg-opacity-12 ">
          บริการของเรา   
          <img src={greyarrow} className="inline mx-3"/>
          <span className="text-[32px] text-[#336DF2]">{service.service_name}</span>
        </div>
        <div className="w-[1119px] h-[129px] border border-[#D8D8D8] py-[19px] px-[160px] rounded-lg mx-auto">
        <Steps current={0} labelPlacement="vertical" items={stepsData} />
        </div>
        
      </div>
      <div className="flex my-8 mx-0 justify-between px-[10vw] min-h-screen ">
        <div className="h-full w-[687px] mr-[2vw] py-8 px-6 mb-[125px] flex flex-col justify-between border border-grey300 rounded-lg mx-auto">
          <div className="">
            เลือกรายการบริการ{service.service_name}
          </div>
           </div>
           <div className="h-full w-[301px] py-8 px-6 flex flex-col justify-between border border-grey300 rounded-lg mr-auto sticky top-40">
            กล่องtest
         </div>
        
      </div>
      <div className="flex justify-between p-5 sticky bottom-0 z-[100] border-y-grey300 border-x-white border px-40 bg-white">
        <button className="btn-secondary flex items-center justify-center text-base font-medium w-40 p-2 px-6 ">
          <img src={arrowblue} />
          ย้อนกลับ
        </button>
        <button className="btn-secondary-[#336DF2]  flex items-center justify-center text-white font-medium w-40 p-2 px-6 bg-[#336DF2] rounded-lg">
        ดำเนินการต่อ
        <img src={goarrow} />
        </button>
      </div>
      
    </div>
  );
}

export default ServiceDetailAddOnlist;