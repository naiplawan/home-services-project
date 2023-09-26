import { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import stripe from "stripe"; // npm install stripe
dotenv.config();

const paymentRouter = Router();
const stripeSecretKey = process.env.STRIPE_TEST_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripeInstance = new stripe(stripeSecretKey);


paymentRouter.use(bodyParser.urlencoded({ extended: true }));
paymentRouter.use(bodyParser.json());
paymentRouter.use(cors());

paymentRouter.get("/", (req, res) => {
  res.send("Welcome to Home Service!");
});

paymentRouter.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

paymentRouter.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const stripeInstance = new stripe(stripeSecretKey);

    const payment = await stripeInstance.paymentIntents.create({
      amount,
      currency: "THB",
      description: "HomeServices",
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

export default paymentRouter;
