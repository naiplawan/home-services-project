//api ฝั่ง customer
import { Router } from "express";
// import { protect } from "../middlewares/protects.js";

const checkoutRouter = Router();
// checkoutRouter.use(protect);

// API route to add new checkout item to checkout table
checkoutRouter.get("/", async (req, res) => {
  
  return res.json({
    message: `Hello World`,
  });
});

export default checkoutRouter;
