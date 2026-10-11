import express from "express";
import cors from "cors";
import authRouter from "./apps/auth.js";
import categoryRouter from "./apps/category.js";
import serviceRouter from "./apps/services.js";
import checkoutRouter from "./apps/checkout.js";
import orderHistoryRouter from "./apps/orderHistory.js";
import paymentRouter from "./apps/payment.js";
import promotionRouter from "./apps/promotion.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/service", serviceRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orderHistory", orderHistoryRouter);
app.use("/api/promotion", promotionRouter);
app.use("/api/payment", paymentRouter);

app.get("/api", (req, res) => {
  res.send("Welcome to Home Service!");
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

export default app;

if (process.env.VERCEL !== "1") {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 4000}`);
  });
}
