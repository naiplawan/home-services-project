import { Router } from "express";
import stripe from "stripe";
import dotenv from "dotenv";
import { protect } from "../middlewares/protects.js";

dotenv.config();

const paymentRouter = Router();
const stripeSecretKey = process.env.STRIPE_TEST_KEY;
const stripeInstance = new stripe(stripeSecretKey);
paymentRouter.use(protect);

paymentRouter.get("/", (req, res) => {
  res.send("Welcome to Payment router");
});

paymentRouter.post("/payment", async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripeInstance.paymentIntents.create({
      amount,
      currency: "THB",
      payment_method: id,
      confirm: true,
    });

    console.log("Payment", payment);

    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.error("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

paymentRouter.use("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

export default paymentRouter;
