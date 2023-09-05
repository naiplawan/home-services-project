import { Router } from "express";

import supabase from "../utils/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log(supabase);
const authRouter = Router();

authRouter.get('/', async (req, res) => {
    // const user = {
    //     fullname: req.body.fullname,
    //     phoneNumber: req.body.phoneNumber,
    //     email: req.body.email,
    //     password: req.body.password,
    //     role: req.body.role,
    // }

    // await pool.query(
    //     `select * from users values ($1, $2, $3, $4, $5)`,
    //         [user]
    // )
    

    try {
        const data = await supabase
            .from('users')
            .select("*") 

        return (
            res.json({
                data
            })
        )
    }catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

authRouter.post('/register', async (req, res) => {
    const user = {
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);

//     await pool.query(
//         `insert into users (fullname, phoneNumber, email, password, role)
//       values ($1, $2, $3, $4, $5)`,
//         [user.fullname, user.phoneNumber, user.email, user.password, user.role]
//       );
    
    await supabase
        .from('users')
        .insert(user)


    return res.json({
        message: "Your account has been ceated successfully",
    });

});

authRouter.post("/login", async (req, res) => {
    const user = await supabase
    .from('user')
    .find({ email: req.body.email})

    if (!user) {
        return res.status(404).json({
            message: "email not found",
        })
    }
    
    const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!isValidPassword) {
        return res.status(400).json({
            message: "password not valid"
        })
    }

    const token = jwt.sign(
        { id: user._id, fullname: user.fullname },
        process.env.SECRET_KEY,
        {
            expiresIn: "9000000"
        }
        
    )
    return res.json({
        message: "login succesfully",
        token,
    })
})

export default authRouter