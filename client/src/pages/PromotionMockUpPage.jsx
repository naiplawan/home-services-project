import { useState } from "react";
import { Input, Button, message } from "antd";
import { usePromotion } from "../hooks/promotion";

const PromotionMockUpPage = () => {
    const [promotionCode, setPromotionCode] = useState("");
    const { promotion, getPromotion, checkPromotionExpiry, decreaseQuota } = usePromotion();

    const totalPrice = 1000;
    const discountPrice = promotion ? totalPrice - promotion.promotion_discount : totalPrice;

    const handleApplyPromotion = async () => {
        console.log("handleApplyPromotion called with promotionCode:", promotionCode);
        try {
          await getPromotion(promotionCode);
          const isValid = checkPromotionExpiry(promotion);
          if (!isValid) {
            message.error("Promotion has expired.");
          } else {
            await decreaseQuota(promotion);
          }
        } catch (error) {
          console.error("Error applying promotion:", error);
          message.error("Error applying promotion.");
        }
      };

    const handleInputChange = (e) => {
        console.log("handleInputChange called with value:", e.target.value);
        setPromotionCode(e.target.value);
    };

    console.log("promotion:", promotion);

    return (
        <div className="promotion-container">
            <Input placeholder="Enter promotion code" onChange={handleInputChange} />
            <Button type="primary" onClick={handleApplyPromotion} disabled={!promotionCode}>
                Apply
            </Button>
            <div className="promotion-total-price">
                <p>Total Price</p>
                <p>{discountPrice}</p>
            </div>
        </div>
    );
};

export default PromotionMockUpPage;