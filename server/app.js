import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./apps/auth.js";
import categoryRouter from "./apps/category.js";
import serviceRouter from "./apps/services.js";
import checkoutRouter from "./apps/checkout.js";
import orderHistoryRouter from "./apps/orderHistory.js";
import orderHistoryByOrderHistoryIdRouter from "./apps/orderHistoryByOrderhistoryID.js";
import dotenv from "dotenv";

async function init() {
  dotenv.config();

  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/service", serviceRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/orderHistory", orderHistoryRouter);
  app.use("/orderHistoryByOrderHistoryId", orderHistoryByOrderHistoryIdRouter);

  app.get("/", (req, res) => {
    res.send("Welcome to Home Service!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
