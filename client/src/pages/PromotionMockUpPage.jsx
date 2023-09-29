import { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { usePromotion } from "../hooks/promotion";

const PromotionMockUpPage = () => {
  const [promotionCode, setPromotionCode] = useState("");
  const { promotion, getPromotion, decreaseQuota } = usePromotion();
  const [totalPrice, setTotalPrice] = useState(1000);
  const [codeUsage, setCodeUsage] = useState(0); // State for code usage count, initialized to 0
  const [expirationDate, setExpirationDate] = useState(null); // State for expiration date
  const [expirationTime, setExpirationTime] = useState(null); // State for expiration date
  const [promotionQuota, setPromotionQuota] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  const {
    promotion_types,
    promotion_discount,
    promotion_expiry_date,
    promotion_expiry_time,
    promotion_quota,
    promotion_code,
  } = promotion;

  const calculateDiscountedPrice = () => {
    if (!promotion_types) {
      return totalPrice;
    }

    if (promotion_types === "fixed") {
      return totalPrice - promotion_discount;
    }

    if (promotion_types === "percent") {
      const discountAmount = (promotion_discount / 100) * totalPrice;
      return totalPrice - discountAmount;
    }

    return totalPrice;
  };

  const handleApplyPromotion = async () => {
    if (!promotionCode) {
        message.error("กรุณากรอก promotion code ก่อน");
        return;
    }

    console.log("handleApplyPromotion called with promotionCode:", promotionCode);
    try {
        await getPromotion(promotionCode);

        if (promotionCode !== promotion_code) {
          message.error("โปรโมชันโค้ดไม่ถูกต้อง");
          return;
        }

        // const isValid = checkPromotionExpiry(promotion);
        //   if (!isValid) {
        //     message.error("Promotion has expired.");
        //   } else {
        //     decreaseQuota(promotion);
        //   }

        // Check expiration date
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        const expirationDateObject = new Date(promotion_expiry_date);

        if (currentDate > expirationDateObject) {
            message.error("โค้ดหมดอายุแล้ว");
            return;
          }

        // Check code usage quota
        if (codeUsage < promotion_quota) {
          // Increment the code usage count
          setCodeUsage((prevCodeUsage) => prevCodeUsage + 1);
          setExpirationDate(promotion_expiry_date); // Update expiration date
          setExpirationTime(promotion_expiry_time); // Update expiration date
          setPromotionQuota(promotion_quota);
          setIsApplied(true); 
          message.success("โค้ดถูกใช้งานแล้ว");

          decreaseQuota(promotion);

          // Calculate discounted price here
          const discountedPrice = calculateDiscountedPrice();

          // Update the UI with the discounted price
          setTotalPrice(discountedPrice);

        } else {
            message.error("โค้ดหมดแล้ว");
        }

    } catch (error) {
        message.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    console.log("handleInputChange called with value:", e.target.value);
    setPromotionCode(e.target.value);

    // Reset the promotion data when the input changes
    setExpirationDate(null);
    setExpirationTime(null);
    setPromotionQuota(null);
    setTotalPrice(1000)
    setCodeUsage(0)
    setIsApplied(false);
  };

  useEffect(() => {
    console.log("promotion:", promotion);
    if (isApplied) {
      setExpirationDate(promotion_expiry_date);
      setExpirationTime(promotion_expiry_time);
      setPromotionQuota(promotion_quota);
    }
  }, [promotion, isApplied]);

  useEffect(() => {
    if (promotionCode === promotion_code) {
      // If the entered code matches the promotion code, apply it automatically
      handleApplyPromotion();
    }
  }, [promotionCode, promotion_code])

  console.log("ราคาหลังลดไป:", totalPrice)

  return (
    <div className="promotion-container">
        <Input 
          placeholder="Enter promotion code" 
          onChange={handleInputChange}
          value={promotionCode} 
        />
        <Button 
          type="primary" 
          onClick={handleApplyPromotion} 
          style={{ backgroundColor: "green" }}
        >
            Apply
        </Button>
        <div className="promotion-total-price">
            <p>Total Price</p>
            <p>{totalPrice}</p>
        </div>
        <div className="promotion-usage">
            <p>Usage</p>
            <p>{`${codeUsage}/${promotion_quota}`}</p> {/* แสดงจำนวนการใช้โปรโมชัน / โควต้า */}
        </div>
        <div className="promotion-expiration">
            <p>Expiration Date</p>
            <p>{expirationDate}{" "}{expirationTime}</p>
        </div>
    </div>
  );
};

export default PromotionMockUpPage;

// import { useState } from "react";
// import { Input, Button, message } from "antd";
// import { usePromotion } from "../hooks/promotion";

// const PromotionMockUpPage = () => {
//     const [promotionCode, setPromotionCode] = useState("");
//     const { promotion, getPromotion, checkPromotionExpiry, decreaseQuota } = usePromotion();

//     const totalPrice = 1000;
//     const discountPrice = promotion ? totalPrice - promotion.promotion_discount : totalPrice;

//     const handleApplyPromotion = async () => {
//         console.log("handleApplyPromotion called with promotionCode:", promotionCode);
//         try {
//           await getPromotion(promotionCode);
//           const isValid = checkPromotionExpiry(promotion);
//           if (!isValid) {
//             message.error("Promotion has expired.");
//           } else {
//             await decreaseQuota(promotion);
//           }
//         } catch (error) {
//           console.error("Error applying promotion:", error);
//           message.error("Error applying promotion.");
//         }
//       };

//     const handleInputChange = (e) => {
//         console.log("handleInputChange called with value:", e.target.value);
//         setPromotionCode(e.target.value);
//     };

//     console.log("promotion:", promotion);

//     return (
//         <div className="promotion-container">
//             <Input placeholder="Enter promotion code" onChange={handleInputChange} />
//             <Button type="primary" onClick={handleApplyPromotion} disabled={!promotionCode}>
//                 Apply
//             </Button>
//             <div className="promotion-total-price">
//                 <p>Total Price</p>
//                 <p>{discountPrice}</p>
//             </div>
//         </div>
//     );
// };

// export default PromotionMockUpPage;