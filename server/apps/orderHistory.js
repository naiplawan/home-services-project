//api order history
import { Router } from "express";
import supabase from "../utils/supabase.js";
// import { protect } from "../middlewares/protects.js";

const orderHistoryRouter = Router();
// orderHistoryRouter.use(protect);

// API route to all order history
orderHistoryRouter.get('/:id', async (req, res) => {
  try {
    const orderHistoryByUserId = req.params.id;

    const { data: result, error } =  await supabase
      .from("order_history")
      .select(`*, users(*, service (*, sub_service (*, checkout_quantity (*, checkout (*)))))`)
      .eq("user_id", orderHistoryByUserId);

      return res.status(200).json({
        result,
      });

  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลและรวมข้อมูล' });
  }
});

export default orderHistoryRouter;
