import { Router } from "express";
import supabase from "../utils/supabase.js";

const promotionRouter = Router();

promotionRouter.post("/", async (req, res) => {
  try {
    const {
        user_id,
        promotion_code,
        promotion_types,
        promotion_quota,
        promotion_discount_amount,
        promotion_expiry_date,
        promotion_expiry_time,
        promotion_created_date_time,
        promotion_edited_date_time,
    } = req.body

    const promotionItem = {
        promotion_code,
        promotion_types,
        promotion_quota,
        promotion_discount_amount,
        promotion_expiry_date,
        promotion_expiry_time,
    }

    console.log
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    console.error(error);
  }
});

export default promotionRouter;
