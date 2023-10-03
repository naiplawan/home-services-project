//api order history
import { Router } from "express";
import supabase from "../utils/supabase.js";
import { protect } from "../middlewares/protects.js";

const orderHistoryRouter = Router();
orderHistoryRouter.use(protect);

// API route to all order history
orderHistoryRouter.get("/:id", async (req, res) => {
  try {
    const orderHistoryByUserId = req.params.id;

    const { data: result, error } = await supabase
      .from("order_history")
      .select(
        `*, 
        service (service_name), 
        checkout(service_date_time, total_price, checkout_quantity(sub_service_quantity, sub_service(sub_service_name, unit))), 
        serviceman_detail(serviceman_name)`
      )
      .eq("user_id", orderHistoryByUserId);

    return res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลและรวมข้อมูล" });
  }
});

export default orderHistoryRouter;
