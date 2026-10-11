import { Router } from "express";
import supabase from "../utils/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // npm install jsonwebtoken

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  try {
    const data = await supabase.from("users").select("*");
    return res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

authRouter.post("/register", async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body ?? {};
  const validName =
    typeof fullName === "string" &&
    fullName.trim().length <= 100 &&
    /^[-a-zA-Z'.ก-๙\s]+$/.test(fullName.trim());
  const validPhone =
    typeof phoneNumber === "string" && /^0[6-9][0-9]{8}$/.test(phoneNumber);
  const validEmail =
    typeof email === "string" &&
    email.length <= 254 &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email.trim());
  const validPassword =
    typeof password === "string" &&
    password.length >= 8 &&
    password.length <= 72 &&
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);

  if (!validName || !validPhone || !validEmail || !validPassword) {
    return res.status(400).json({ error: "กรุณาตรวจสอบข้อมูลที่กรอก" });
  }

  const user = {
    fullName: fullName.trim(),
    phoneNumber,
    email: email.trim(),
    password,
    role: "customer",
  };

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { error } = await supabase
      .from("users")
      .insert([
        {
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        },
      ]);

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          error: "อีเมลหรือเบอร์โทรศัพท์นี้ถูกใช้แล้ว",
        });
      }

      console.error("Registration database error:", { code: error.code ?? "UNKNOWN" });
      return res.status(500).json({ error: "Failed to register user." });
    }

    return res.json({
      message: "Your account has been created successfully",
    });
  } catch (err) {
    console.error("Registration request failed:", { code: err?.code ?? "UNKNOWN" });
    return res.status(500).json({ error: "Failed to register user." });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", req.body.email);

    if (!user[0]) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Password is invalid",
      });
    }
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    const token = jwt.sign(
      {
        user_id: user[0].user_id,
        fullName: user[0].fullName,
        email: user[0].email,
        phoneNumber: user[0].phoneNumber,
        role: user[0].role,
      },
      process.env.REACT_APP_JWT_KEY,
      { expiresIn: "3600000" }
    );
    return res.json({
      message: "login successfully",
      data: user[0],
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default authRouter;
