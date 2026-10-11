import image from "../../assets/CustomerPhoto/imageIndex.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "@/routing/navigation.jsx";
import dateFormat from "../../utils/dateFormat.js";
import LoadingState from "@/components/ui/loading-state.jsx";
import { buttonStyles } from "@/lib/ui-classes.js";
// import Moment from "react-moment";

function OrderList () {
    const { userId } = useParams();
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrderHistoryById(userId);
    }, [userId])

    const getOrderHistoryById = async (userId) => {
        try {
            setLoading(true);
            const result = await axios.get(
                `/api/orderHistory/${userId}`
            );
            setOrder(result.data.result);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    if (loading) {
        return <LoadingState label="กำลังโหลดรายการคำสั่งซื้อ" />;
    }
    console.log(order)
   

    return (
        <div className="flex-col">
            {order.length === 0 ? (
                <div className="mb-8 w-full rounded-lg border border-grey300 bg-white p-4 md:ml-8 md:flex-1 md:p-6">
                    <h1 className="text-grey700 text-2xl font-normal text-center">
                        ไม่มีรายการสั่งซ่อม
                    </h1>
              </div>
            ) : (
                <div>
                    {order.map((data, index) => {
                        if (data.status === "รอดำเนินการ" || data.status === "กำลังดำเนินการ")
                        return (
                            <div 
                                className="mb-7 flex w-full flex-col gap-6 rounded-lg border border-grey300 bg-white p-4 md:ml-8 md:flex-1 md:flex-row md:justify-between md:p-6"
                                key={index}
                            >
                                <div>
                                    <div className="text-xl font-medium leading-normal">
                                        คำสั่งซ่อมรหัส : {data.order_number}
                                    </div>
                                    <div className="mt-3 mb-5 flex min-h-12 flex-col gap-y-[9px] text-sm font-normal leading-[150%] text-grey700">
                                        <div className="flex gap-x-[15px]">
                                            <img 
                                                className="w-5 h-5" 
                                                src={image.calendarIcon}
                                                alt="Calendar Icon" 
                                            />
                                            <div>
                                              วันเวลาดำเนินการ:{" "}
                                                    {dateFormat(data.checkout.service_date_time)}
                                            </div>
                                        </div>
                                        <div className="flex gap-x-[15px]">
                                            <img 
                                                className="w-5 h-5" 
                                                src={image.personIcon2}
                                                alt="Person Icon" 
                                            />
                                            <div>พนักงาน: {data.serviceman_detail.serviceman_name}</div>
                                        </div>
                                    </div>
                                    <div className="text-base font-normal leading-normal text-grey700">
                                        รายการ: {data.service.service_name}
                                        <ul className="flex flex-col list-disc ml-3">
                                            {data.checkout.checkout_quantity.map((subService, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="ml-2 my-1 font-normal text-sm text-black"
                                                    >
                                                        {subService.sub_service.sub_service_name}, {" "}
                                                        {subService.sub_service_quantity} {subService.sub_service.unit}
                                                    </li>
                                                )
                                            })}
                                        </ul> 
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-between gap-y-6 md:items-end md:gap-y-12">
                                    <div className="flex min-h-[65px] flex-col gap-y-[13px]">
                                        <div className="text-grey700 font-normal text-sm leading-[150%] flex gap-x-3 justify-end items-center">
                                            สถานะ:{" "}
                                            {data.status === "รอดำเนินการ" ? (
                                                <div className="bg-[#E6E7EB] text-grey900 text-sm font-normal px-3 py-[2px] rounded-[99px]">
                                                    {data.status}
                                                </div>
                                            ) : data.status === "กำลังดำเนินการ" ? (
                                                <div className="bg-[#FFF3D4] text-grey900 text-sm font-normal px-3 py-[2px] rounded-[99px]">
                                                    {data.status}
                                                </div>
                                            ) : (
                                                <div className="bg-[#DFF9F6] text-grey900 text-sm font-normal px-3 py-[2px] rounded-[99px]">
                                                    {data.status}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-grey700 font-normal text-sm leading-normal flex gap-x-5 justify-end items-center">
                                            ราคารวม:
                                            <div className="text-lg text-black font-medium leading-normal">
                                                {parseFloat(data.checkout.total_price)
                                                    .toFixed(2)}{" "}
                                                    ฿
                                            </div>
                                        </div>
                                    </div>
                                    <button className={`${buttonStyles.primary} w-34`}>
                                        ดูรายละเอียด      
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        
         
    );
}

export default OrderList;
