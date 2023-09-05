import { Router } from "express";
import supabase from "../utils/supabase.js";
import bcrypt from "bcrypt";
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

export default authRouter;  