import { useState } from "react";
import axios from "axios";

export const usePromotion = () => {
  const [promotion, setPromotion] = useState({});

  const getPromotion = async (promotionCode) => {
    try {
      const response = await axios(`http://localhost:4000/promotion?keyword=${promotionCode}`);
      const data = response.data.data[0];
      setPromotion(data);
    } catch (error) {
      console.error("Failed to get promotions:", error);
    }
  };

  return { promotion, getPromotion };
};