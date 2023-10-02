import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";

function PromotionDetail() {
  const [promotionById, setPromotionById] = useState([]);
  const [promotionDetail, setPromotionDetail] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const getPromotionDetail = async (promotionId) => {
    const result = await axios.get(
      `http://localhost:4000/promotion/${promotionId}`
    );
    setPromotionById(result.data.data);
    setPromotionDetail(result.data.data[0].promotion_code);
    console.log(result.data.data);
    console.log(result.data.data[0].promotion_code);
  };
  useEffect(() => {
    getPromotionDetail(params.promotionId);
    console.log(params.promotionId);
  }, []);

  return (
    <div className="bg-grey100 h-[100%] pb-[4%] pl-60 ">
      {promotionById.map((promotion) => {
        return (
          <>
            <div className="header-detail justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
              <div className="flex">
                <img
                  src={arrow}
                  className=" h-[40px] w-[40px] cursor-pointer hover:scale-110 transition"
                  onClick={() => navigate("/admin-promotion")}
                />
                <div className="Header-name">
                  <p className="category-text text-xs">Promotion Code</p>
                  <h1
                    name={promotionDetail}
                    className="text-black   font-semibold text-xl"
                  >
                    {promotion.promotion_code}
                  </h1>
                </div>
              </div>
              <button
                className="btn-primary  h-[100%] w-[112px] p-[20px] text-white focus:outline-none "
                onClick={() =>
                  navigate(`/admin-promotion-edit/${promotion.promotion_id}`)
                }
              >
                แก้ไข
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="detail-container w-[95%] rounded-lg border border-grey300 bg-white font-normal flex-col items-center  px-10 mt-10 pt-[20px] py-[10px] ">
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">Promotion Code</span>
                  <span className="px-[135px] text-black ">
                    {promotion.promotion_code}
                  </span>
                </p>
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">ประเภท</span>
                  <span className="px-[215px] text-black ">
                    {promotion.promotion_types.charAt(0).toUpperCase() +
                      promotion.promotion_types.slice(1).toLowerCase()}
                  </span>
                </p>
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">ราคาที่ลด</span>
                  <span className="px-[200px] text-[#C82438] ">
                    -
                    {promotion.promotion_types === "fixed"
                      ? `${promotion.promotion_discount}฿`
                      : `${promotion.promotion_discount}%`}
                  </span>
                </p>
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">โควต้าการใช้คงเหลือ</span>
                  <span className="px-[125px] text-black ">
                    {promotion.promotion_quota} ครั้ง
                  </span>
                </p>
                <p className="pb-[40px] pt-[20px] ">
                  <span className="text-grey700">วันหมดอายุ</span>
                  <span className="px-[185px] text-black ">
                    {dateFormat(
                      `${promotion.promotion_expiry_date} ${promotion.promotion_expiry_time}`
                    )}
                  </span>
                </p>
                <hr className="py-[20px]" />
                <p className="pb-[25px] ">
                  <span className="text-grey700">สร้างเมื่อ</span>
                  <span className="px-[200px] text-black ">
                    {dateFormat(promotion.promotion_created_date_time)}
                  </span>
                </p>
                <p className="pb-[40px] ">
                  <span className="text-grey700">แก้ไขล่าสุด</span>
                  <span className="px-[189px] text-black ">
                    {dateFormat(promotion.promotion_edited_date_time)}
                  </span>
                </p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default PromotionDetail;
