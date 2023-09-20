import image from "../../assets/CustomerPhoto/imageIndex.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RepairList () {
    const params = useParams();
    const [order, setOrder] = useState([]);

    return (
        <div className="flex-col">
            <div className="p-6 w-[50vw] ml-10 mb-[28px] bg-white border border-grey300 rounded-lg flex justify-between">
                <div>
                    <div className="text-xl font-medium leading-normal">
                        คำสั่งซ่อมรหัส : AD04071205
                    </div>
                    <div className="h-12 flex flex-col gap-y-[9px] mt-3 mb-5 text-sm font-normal leading-[150%] text-grey700">
                        <div className="flex gap-x-[15px]">
                            <img 
                                className="w-5 h-5" 
                                src={image.calendarIcon}
                                alt="Calendar Icon" 
                            />
                            <div>
                              วันเวลาดำเนินการสำเร็จ: 25/04/2563 เวลา 16.00 น.  
                            </div>
                        </div>
                        <div className="flex gap-x-[15px]">
                            <img 
                                className="w-5 h-5" 
                                src={image.personIcon2}
                                alt="Person Icon" 
                            />
                            <div>พนักงาน: สตีฟ จ็อบ</div>
                        </div>
                    </div>
                    <div className="text-base font-normal leading-normal text-grey700">
                        รายการ:
                        <ul className="flex flex-col list-disc ml-3">
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                        </ul> 
                    </div>
                </div>
                <div className="flex flex-col gap-y-12 items-end justify-between">
                    <div className="h-[65px] flex flex-col gap-y-[13px]">
                        <div className="text-grey700 font-normal text-sm leading-[150%] flex gap-x-3 justify-end items-center">
                            สถานะ:
                                <div className="bg-[#E6E7EB] text-grey900 text-sm font-normal px-3 py-[2px] rounded-[99px]">
                                    รอดำเนินการ
                                </div>
                        </div>
                        <div className="text-grey700 font-normal text-sm leading-normal flex gap-x-5 justify-end items-center">
                            ราคารวม:
                            <div className="text-lg text-black font-medium leading-normal">
                                1,550.00 ฿
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary w-34">
                        ดูรายละเอียด      
                    </button>
                </div>
            </div>
            {/* box 2 */}
            <div className="p-6 w-[50vw] ml-10 mb-[28px] bg-white border border-grey300 rounded-lg flex justify-between">
                <div>
                    <div className="text-xl font-medium leading-normal">
                        คำสั่งซ่อมรหัส : AD04071205
                    </div>
                    <div className="h-12 flex flex-col gap-y-[9px] mt-3 mb-5 text-sm font-normal leading-[150%] text-grey700">
                        <div className="flex gap-x-[15px]">
                            <img 
                                className="w-5 h-5" 
                                src={image.calendarIcon}
                                alt="Calendar Icon" 
                            />
                            <div>
                              วันเวลาดำเนินการสำเร็จ: 25/04/2563 เวลา 16.00 น.  
                            </div>
                        </div>
                        <div className="flex gap-x-[15px]">
                            <img 
                                className="w-5 h-5" 
                                src={image.personIcon2}
                                alt="Person Icon" 
                            />
                            <div>พนักงาน: สตีฟ จ็อบ</div>
                        </div>
                    </div>
                    <div className="text-base font-normal leading-normal text-grey700">
                        รายการ:
                        <ul className="flex flex-col list-disc ml-3">
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                        </ul> 
                    </div>
                </div>
                <div className="flex flex-col gap-y-12 items-end justify-between">
                    <div className="h-[65px] flex flex-col gap-y-[13px]">
                        <div className="text-grey700 font-normal text-sm leading-[150%] flex gap-x-3 justify-end items-center">
                            สถานะ:
                                <div className="bg-[#FFF3D4] text-grey900 text-sm font-normal px-3 py-[2px] rounded-[99px]">
                                    กำลังดำเนินการ
                                </div>
                        </div>
                        <div className="text-grey700 font-normal text-sm leading-normal flex gap-x-5 justify-end items-center">
                            ราคารวม:
                            <div className="text-lg text-black font-medium leading-normal">
                                1,550.00 ฿
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary w-34">
                        ดูรายละเอียด      
                    </button>
                </div>
            </div>
            {/* box 3 */}
            <div className="p-6 w-[50vw] ml-10 mb-[28px] bg-white border border-grey300 rounded-lg flex justify-between">
                <div>
                    <div className="text-xl font-medium leading-normal">
                        คำสั่งซ่อมรหัส : AD04071205
                    </div>
                    <div className="h-12 flex flex-col gap-y-[9px] mt-3 mb-5 text-sm font-normal leading-[150%] text-grey700">
                        <div className="flex gap-x-[15px]">
                            <img 
                                className="w-5 h-5" 
                                src={image.calendarIcon}
                                alt="Calendar Icon" 
                            />
                            <div>
                              วันเวลาดำเนินการสำเร็จ: 25/04/2563 เวลา 16.00 น.  
                            </div>
                        </div>
                        <div className="flex gap-x-[15px]">
                            <img 
                                className="w-5 h-5" 
                                src={image.personIcon2}
                                alt="Person Icon" 
                            />
                            <div>พนักงาน: สตีฟ จ็อบ</div>
                        </div>
                    </div>
                    <div className="text-base font-normal leading-normal text-grey700">
                        รายการ:
                        <ul className="flex flex-col list-disc ml-3">
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                            <li className="ml-2 my-1 font-normal text-sm text-black">
                                ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                            </li>
                        </ul> 
                    </div>
                </div>
                <div className="flex flex-col gap-y-12 items-end justify-between">
                    <div className="h-[65px] flex flex-col gap-y-[13px]">
                        <div className="text-grey700 font-normal text-sm leading-[150%] flex gap-x-3 justify-end items-center">
                            สถานะ:
                                <div className="bg-[#FFF3D4] text-grey900 text-sm font-normal px-3 py-[2px] rounded-[99px]">
                                    กำลังดำเนินการ
                                </div>
                        </div>
                        <div className="text-grey700 font-normal text-sm leading-normal flex gap-x-5 justify-end items-center">
                            ราคารวม:
                            <div className="text-lg text-black font-medium leading-normal">
                                1,550.00 ฿
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary w-34">
                        ดูรายละเอียด      
                    </button>
                </div>
            </div>
        </div>
        
         
    );
}

export default RepairList;