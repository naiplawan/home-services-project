import { Router } from "express";
import bcrypt from "bcrypt"; //เป็นการเข้ารหัส
import jwt from "jsonwebtoken";
// import { db } from "../utils/db.js";

const authRouter = Router();

// function Register
authRouter.post("/register", async (req, res) => {
  const user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // coursebook เป้น mongoDB 🐷 ตรงนี้เหมือนเป็นการ access ข้อมุลใน data มิ้นไม่แน่ใจว่าโค้ดแบบไหน
  // const collection = db.collection("users");
  //   await collection.insertOne(user);

  return res.json({ message: "User has been created successfully" });
});

// todo 3 ให้สร้าง API เพื่อเอาไว้ Login ตัว User ตามตารางที่ออกแบบไว้
authRouter.post("/login", async (req, res) => {
  // coursebook เป้น mongoDB 🐷
  // const user = await await db.collection("users").findOne({
  //     username: req.body.username,
  //   });

  //   if (!user) {
  //     return res.status(404).json({
  //       message: "User not found",
  //     });
  //   }

  //   const isValidPassword = await bcrypt.compare(
  //     req.body.password,
  //     user.password
  //   );

  //   if (!isValidPassword) {
  //     return res.status(404).json({
  //       message: "password not valid",
  //     });
  //   }

  //   const token = jwt.sign(
  //     {
  //       id: user._id,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       role: user.role,
  //     },
  //     process.env.SECRET_KEY,
  //     {
  //       expiresIn: "900000",
  //     }
  //   );
  return res.json({
    message: "Login successfully",
    token,
  });
});

export default authRouter;
