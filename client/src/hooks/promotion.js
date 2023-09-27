import { useState } from "react";
import axios from "axios";

export function usePromotion() {
  const [promotion, setPromotion] = useState(null);
  const [usageCount, setUsageCount] = useState(0);

  const getPromotion = async (promotionCode) => {
    try {
      const response = await axios.get(`http://localhost:4000/promotion/?keyword=${promotionCode}`);
      console.log(response.data);
      const matchingPromotion = response.data[0];
      if (matchingPromotion) {
        setPromotion(matchingPromotion);
        setUsageCount((count) => count + 1);
        console.log("Promotion found:", matchingPromotion);
      } else {
        setPromotion(null);
        console.log("Invalid promotion code.");
      }
    } catch (error) {
      console.error("Failed to get promotions:", error);
    }
  };

  return { promotion, getPromotion };
}