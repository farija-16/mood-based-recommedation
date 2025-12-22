import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
//Register 

router.post("/register",async(req,res) => {
    console.log("Incoming registration data:",req.body);
    
    try {
        const{username,email,password} = req.body;
        // ✅ 1. Validate fields
        if (!username || !email || !password)
            return res.status(400).json({message : "All fields are required.."});

        const existingUser = await User.findOne({email});
        // ✅ 2. Check if user already exists
        if (existingUser)
            return res.status(400).json({ message: "Email already registred"});
     // ✅ 3. Hash password
    const hashedPassword = await bcrypt.hash(password,10);
     // ✅ 4. Create new user
    const newUser = new User({username,email,password : hashedPassword});
    await newUser.save();
    // ✅ 5. Respond success
    res.status(201).json({ message : "User registred successfully!"});
    } catch (err) {
        console.error("Register error:",err);
        res.status(500).json({message: "Server error during registration"});
    }
});

//Login
router.post("/login",async(req,res) => {
    try {
        const { email, password} = req.body;

        //check for missing fields
        if(!email|| !password) {
            return res.status(400).json({message:"All fields are required."});
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message : "User not found"});
        } 

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) { 
            return res.status(400).json({message:"Invalid Credentials."});
        }

        const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {
            expiresIn : "1d",
        });

        res.status(200).json({
            message : "Login Successfull",
            token,
            id : user._id,
            username: user.username,
            email:user.email,
        });
    } catch (err) {
        console.error("Login error.",err);
        res.status(500).json({message:"Server error during login."});
    }
});
 
export default router;