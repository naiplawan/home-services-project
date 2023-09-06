import { Router } from "express";
import supabase from "../utils/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // npm install jsonwebtoken

const authRouter = Router();

authRouter.get('/', async (req, res) => {
    try {
        const data = await supabase
            .from('users')
            .select("*");
        return res.json({
            data
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

authRouter.post('/register', async (req, res) => {
    const user = {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }

    console.log('Received data from frontend:', user); // Log the data
    
    try {
           // Generate a salt
           const salt = await bcrypt.genSalt(10);

           // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    password: hashedPassword, 
                    role: user.role,
                },
            ])
            .select();

        if (error) {
            return res.status(500).json({ error: 'Failed to register user.' });
        }

        // Log the data
        console.log('User data after registration:', data);

        return res.json({
            message: "Your account has been created successfully",
        });
    } catch (err) {
        console.error('Error while registering user:', err);
        return res.status(500).json({ error: 'Failed to register user.' });
    }
});

authRouter.post("/login", async (req, res) => {
  const user = await supabase.from("user").find({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "email not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).json({
      message: "password not valid",
    });
  }

  const token = jwt.sign(
    { id: user._id, fullname: user.fullname },
    process.env.SECRET_KEY,
    {
      expiresIn: "9000000",
    }
  );
  return res.json({
    message: "login succesfully",
    token,
  });
});

export default authRouter;  

