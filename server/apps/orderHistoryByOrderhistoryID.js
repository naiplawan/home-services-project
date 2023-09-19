//api order history by id
import { Router } from "express";
// import { protect } from "../middlewares/protects.js";

const orderHistoryByOrderHistoryIdRouter = Router();
// orderHistoryByOrderHistoryIdRouter.use(protect);

orderHistoryByOrderHistoryIdRouter.get("/", async (req, res) => {
  
    return res.json({
      message: `Hello World triple`,
    });
  });
  
  export default orderHistoryByOrderHistoryIdRouter;