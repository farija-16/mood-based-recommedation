import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const  register = async (req,res) => {
    try {
        const { username , email , password } = req.body;
        if(!username || !email || !password ) {
            return res.status(400).json({ message : "All Fields are required."});
        }

        const exists = await User.findOne( { email });
        if(exists) {
            return res.status(400).json ({ message : "Email already registred."});
        }

        const hash = await bcrypt.hash(password,10);
        const newUser = new User( { username , email , password : hash });
        await newUser.save();

        return res.status(201).json( { message : "Registred Successfully!"});
    } catch (err) {
        console.error ("Registred Error",err);
        return res.status(500).json ( { message : "Server error "});
    }
};