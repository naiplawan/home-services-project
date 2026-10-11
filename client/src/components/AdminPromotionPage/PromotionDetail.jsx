import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "@/routing/navigation.jsx";
import dateFormat from "../../utils/dateFormat.js";
import arrow from "../../assets/AdminPhoto/arrow.png";
import assetUrl from "../../assets/assetUrl.js";
import { buttonStyles } from "@/lib/ui-classes.js";

function PromotionDetail() {
  const [promotionById, setPromotionById] = useState([]);
  const [promotionDetail, setPromotionDetail] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const getPromotionDetail = async (promotionId) => {
    const result = await axios.get(
      `/api/promotion/${promotionId}`
    );
    setPromotionById(result.data.data);
    setPromotionDetail(result.data.data[0].promotion_code);
    console.log(result.data.data);
    console.log(result.data.data[0].promotion_code);
  };
  useEffect(() => {
    getPromotionDetail(params.promotionId);
    console.log(params.promotionId);
  }, [params.promotionId]);

  return (
    <div className="min-h-screen bg-grey100 pb-8 pl-14 lg:pb-[4%] lg:pl-60">
      {promotionById.map((promotion) => {
        return (
          <>
            <div className="header-detail flex min-h-20 items-center justify-between gap-3 border-b border-grey300 bg-white px-3 py-3 text-grey600 sm:px-6 lg:px-10">
              <div className="flex">
                <img
                  src={assetUrl(arrow)}
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
                className={`${buttonStyles.primary} h-10 w-28 p-2.5`}
                onClick={() =>
                  navigate(`/admin-promotion-edit/${promotion.promotion_id}`)
                }
              >
                แก้ไข
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="detail-container mt-6 flex w-[calc(100%-2rem)] flex-col rounded-lg border border-grey300 bg-white px-4 py-5 font-normal sm:mt-10 sm:w-[95%] sm:px-10">
                <p className="flex flex-col gap-2 pb-8 pt-4 sm:flex-row sm:items-center">
                  <span className="text-grey700">Promotion Code</span>
                  <span className="break-words text-black sm:ml-8 lg:ml-24">
                    {promotion.promotion_code}
                  </span>
                </p>
                <p className="flex flex-col gap-2 pb-8 pt-4 sm:flex-row sm:items-center">
                  <span className="text-grey700">ประเภท</span>
                  <span className="text-black sm:ml-8 lg:ml-24">
                    {promotion.promotion_types.charAt(0).toUpperCase() +
                      promotion.promotion_types.slice(1).toLowerCase()}
                  </span>
                </p>
                <p className="flex flex-col gap-2 pb-8 pt-4 sm:flex-row sm:items-center">
                  <span className="text-grey700">ราคาที่ลด</span>
                  <span className="text-[#C82438] sm:ml-8 lg:ml-24">
                    -
                    {promotion.promotion_types === "fixed"
                      ? `${promotion.promotion_discount}฿`
                      : `${promotion.promotion_discount}%`}
                  </span>
                </p>
                <p className="flex flex-col gap-2 pb-8 pt-4 sm:flex-row sm:items-center">
                  <span className="text-grey700">โควต้าการใช้คงเหลือ</span>
                  <span className="text-black sm:ml-8 lg:ml-24">
                    {promotion.promotion_quota} ครั้ง
                  </span>
                </p>
                <p className="flex flex-col gap-2 pb-8 pt-4 sm:flex-row sm:items-center">
                  <span className="text-grey700">วันหมดอายุ</span>
                  <span className="text-black sm:ml-8 lg:ml-24">
                    {dateFormat(
                      `${promotion.promotion_expiry_date} ${promotion.promotion_expiry_time}`
                    )}
                  </span>
                </p>
                <hr className="py-[20px]" />
                <p className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center">
                  <span className="text-grey700">สร้างเมื่อ</span>
                  <span className="text-black sm:ml-8 lg:ml-24">
                    {dateFormat(promotion.promotion_created_date_time)}
                  </span>
                </p>
                <p className="flex flex-col gap-2 pb-8 sm:flex-row sm:items-center">
                  <span className="text-grey700">แก้ไขล่าสุด</span>
                  <span className="text-black sm:ml-8 lg:ml-24">
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
