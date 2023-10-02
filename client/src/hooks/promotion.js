import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { message } from "antd"; 

export const usePromotion = () => {
  const [promotion, setPromotion] = useState({});

  const getPromotion = async (promotionCode) => {
    try {
      const response = await axios(`http://localhost:4000/checkout?keyword=${promotionCode}`);
      setPromotion(response.data.data[0]);
    } catch (error) {
      console.error("Failed to get promotions:", error);
    }
  };

  const checkPromotionExpiry = (promotion) => {
    const { promotion_expiry_date, promotion_expiry_time } = promotion;
    const now = moment();
    console.log("เวลาปัจจุบัน", now)
    const expireDateTime = moment(`${promotion_expiry_date} ${promotion_expiry_time}`, "DD-MM-YYYY HH:mm:ss");
    if (now.isBefore(expireDateTime)) {
      return true;
    } else if (now.isSameOrAfter(expireDateTime)) {
      return false;
    }
  };

  const decreaseQuota = (promotion) => {
    const newQuota = promotion.promotion_quota - 1;
    const promotionId = promotion.promotion_id;
    console.log("promotion_quota:", promotion.promotion_quota);
    console.log("promotionId:", promotionId);
    console.log("newQuota:", newQuota);
    const updatedPromotionItem = {
     promotion_code: promotion.promotion_code,
      promotion_types: promotion.promotion_types,
      promotion_quota: newQuota,
      promotion_discount: promotion.promotion_discount,
      promotion_expiry_date: promotion.promotion_expiry_date,
      promotion_expiry_time: promotion.promotion_expiry_time,
    };
    console.log("ที่จะส่งไปหลังบ้าน:", updatedPromotionItem);
    axios.put(`http://localhost:4000/promotion/${promotion.promotion_id}`, updatedPromotionItem)
      .then((response) => {
        console.log("Decreased promotion quota:", response.data);
        message.success("ใช้โค้ดส่วนลดสำเร็จ");
      })
      .catch((error) => {
        console.error("Failed to decrease promotion quota:", error);
        message.error("ส่งข้อมูลไปเซิฟเวอร์ล้มเหลว");
      });
  };

  return { promotion, getPromotion, checkPromotionExpiry, decreaseQuota };
};