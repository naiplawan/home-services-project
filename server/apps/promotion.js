import { Router } from "express";
import supabase from "../utils/supabase.js";

const promotionRouter = Router();

promotionRouter.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const {
      user_id,
      promotion_code,
      promotion_types,
      promotion_quota,
      promotion_expiry_date,
      promotion_expiry_time,
    } = req.body;

    //item

    const promotionItem = {
      promotion_code,
      promotion_types,
      promotion_quota,
      promotion_expiry_date,
      promotion_expiry_time,
    } 

 
    // date and time
    const expiryDate = new Date(promotion_expiry_date);
    const expiryTime = new Date(promotion_expiry_time);

    // Get current date and time
    const currentDateTime = new Date();

    console.log(promotionItem)

    // Insert data into Supabase table
    const { data, error } = await supabase
      .from('promotion')
      .insert([
        {
          promotion_code,
          promotion_types,
          promotion_quota,
          promotion_expiry_date: expiryDate,
          promotion_expiry_time: expiryTime,
          promotion_created_date_time: currentDateTime,
          promotion_edited_date_time: currentDateTime,
        },
      ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


export default promotionRouter;
