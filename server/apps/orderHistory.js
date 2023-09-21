//api order history
import { Router } from "express";
// import { protect } from "../middlewares/protects.js";

const orderHistoryRouter = Router();
// orderHistoryRouter.use(protect);

orderHistoryRouter.get("/", async (req, res) => {
  
  return res.json({
    message: `Hello World twice`,
  });
});

export default orderHistoryRouter;
