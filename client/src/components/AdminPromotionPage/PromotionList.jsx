import { useState, useEffect } from "react";
import { useNavigate } from "@/routing/navigation.jsx";
import axios from "axios";
import dateFormat from "../../utils/dateFormat.js";
import trashIcon from "../../assets/AdminPhoto/trash-icon.png";
import editIcon from "../../assets/AdminPhoto/edit-icon.png";
import assetUrl from "../../assets/assetUrl.js";
import plusSign from "../../assets/AdminPhoto/plus-sign.svg";
import AlertBoxDelete from "../AlertBox.jsx";
import LoadingState from "@/components/ui/loading-state.jsx";
import { buttonStyles } from "@/lib/ui-classes.js";

function PromotionList() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [promotion_Id, setPromotion_Id] = useState();
  const [deletePromotionId, setDeletePromotionId] = useState(null);
  const navigate = useNavigate();

  const getPromotion = async () => {
    try {
      const result = await axios("/api/promotion");
      setData(result.data.data);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเรียกข้อมูลโปรโมชั่น");
    }
  };

  // deletePromotion
  const deletePromotionById = async (promotionId) => {
    try {
      await axios.delete(`/api/promotion/${promotionId}`);
      getPromotion();
      hide();
    } catch (error) {
      console.log("เกิดข้อผิดพลาดในการลบโปรโมชั่น");
    }
  };

  const promotionDeleteAlert = (promotionId) => {
    setPromotion_Id(promotionId);
    setDeletePromotionId(promotionId);
  };

  const handleDelete = () => {
    deletePromotionById(promotion_Id);
    setDeletePromotionId(null);
  };

  const hide = () => {
    setDeletePromotionId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `/api/promotion?keyword=${keyword}`
        );

        if (response.data.error) {
          setError("เกิดข้อผิดพลาดในการค้นหา");
        } else {
          setData(response.data.data);
          console.log("ผลลัพธ์การค้นหา", response.data.data);
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    };

    fetchData();
  }, [keyword]);

  console.log(data);

  return (
    <div className="min-h-screen bg-bg pb-[4%] pl-14 lg:pl-60">
      <div className="flex flex-col items-center">
        <div className="header-name flex min-h-20 flex-col items-stretch justify-between gap-3 border-b border-grey300 bg-white px-4 py-4 text-grey600 sm:px-6 lg:flex-row lg:items-center lg:px-10">
          <h1 className="text-black font-semibold text-xl">Promotion Code</h1>
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="ค้นหา Promotion Code ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full min-w-0 rounded-lg border border-grey300 bg-white px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring sm:w-[400px]"
            />

            <button
              alt="add-category"
              className={`${buttonStyles.primary} flex shrink-0 items-center justify-center sm:w-[238px] lg:ml-7`}
              onClick={() => navigate("/admin-promotion-create")}
            >
              <p className="">เพิ่ม Promotion Code</p>
              <p className="pt-2 pl-[15px]">
                <img src={plusSign} className="w-[10px] h-[10px]" />
              </p>
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="results w-[95%] min-w-0">
          {data.length === 0 ? (
            <LoadingState label="กำลังโหลดโปรโมชั่น" />
          ) : (
            <div className="category-list mt-10 w-full overflow-x-auto">
              <ul>
                <li className="flex min-w-[960px] list-none rounded-t-lg border-[1px] border-grey300 bg-grey200 p-[20px] text-sm text-grey600">
                  <span className="text-grey700 mx-[1%]">Promotion Code</span>
                  <span className="text-grey700 mx-[6%]">ประเภท</span>
                  <span className="text-grey700 ml-[%] ">
                    โควต้าเหลือ(ครั้ง)
                  </span>
                  <span className="text-grey700 mx-[5%]">ราคาที่ลด</span>
                  <span className="text-grey700 mx-[4%]">สร้างเมื่อ</span>
                  <span className="text-grey700 mx-[12%]">วันหมดอายุ</span>
                  <span className="text-grey700 mx-[9%] mr-[2%]">Action</span>
                </li>
                <ul>
                  {data &&
                    data.data &&
                    data.data
                      .filter(
                        (dataItem) =>
                          dataItem.promotion_code
                            .toLowerCase()
                            .includes(keyword.toLowerCase()) ||
                          dataItem.promotion_types
                            .toLowerCase()
                            .includes(keyword.toLowerCase())
                      )
                      .map((promotion) => (
                        <li
                          key={promotion.promotion_id}
                          className="flex min-w-[960px] list-none border-[1px] border-grey200 bg-white p-[20px] hover:bg-grey100"
                        >
                          <div className="category-detail cursor-pointer flex justify-between w-[100%] text-black">
                            <div
                              onClick={() =>
                                navigate(
                                  `/admin-promotion-detail/${promotion.promotion_id}`
                                )
                              }
                              className="flex w-[90%] pl-[%] pt-[1%] text-center"
                            >
                              <p className="w-[20%] ml-[%]">
                                {promotion.promotion_code}
                              </p>
                              <p className="w-[20%] ml-[5%]">
                                {promotion.promotion_types}
                              </p>
                              <p className="w-[20%] ml-[3%]">
                                {promotion.promotion_quota}
                              </p>
                              <p className="w-[30%] ml-[%]  text-red">
                                {console.log(
                                  "เช็ค type promotion",
                                  promotion.promotion_types
                                )}
                                {promotion.promotion_types === "fixed"
                                  ? `${promotion.promotion_discount}฿`
                                  : `${promotion.promotion_discount}%`}
                              </p>

                              <p className="w-[50%] ml-[%]">
                                {dateFormat(
                                  promotion.promotion_created_date_time
                                )}
                              </p>
                              <p className="w-[50%] mr-[8%]">
                                {console.log(
                                  "เช็ค วันหมดอายุโค้ด",
                                  promotion.promotion_expiry_date
                                )}

                                {dateFormat(
                                  `${promotion.promotion_expiry_date} ${promotion.promotion_expiry_time}`
                                )}
                              </p>
                            </div>
                            {promotion.promotion_id !== deletePromotionId && (
                              <div className="pr-[5%] flex items-center">
                                <img
                                  className="cursor-pointer w-[25px] h-[25px] mr-[50%]"
                                  src={assetUrl(trashIcon)}
                                  onClick={() =>
                                    promotionDeleteAlert(promotion.promotion_id)
                                  }
                                />
                                <img
                                  src={assetUrl(editIcon)}
                                  className="cursor-pointer w-[25px] h-[25px]"
                                  onClick={() =>
                                    navigate(
                                      `/admin-promotion-edit/${promotion.promotion_id}`
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                </ul>
              </ul>
            </div>
          )}
          {deletePromotionId && (
            <AlertBoxDelete
              deleteFunction={handleDelete}
              hideFunction={hide}
              textAlert="ยืนยันการลบรายการ"
              alertQuestion={`คุณต้องการลบรายการ '${
                data.data.find(
                  (item) => item.promotion_id === deletePromotionId
                )?.promotion_code
              }' ใช่หรือไม่ ?`}
              primary="ลบรายการ"
              secondary="ยกเลิก"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PromotionList;
