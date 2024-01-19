import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({or} ,{email, username})
        if(existingUser) return next(errorHandler(403, 'Account with that username or email exists'))
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User ({username, email, password: hashedPassword})
        await newUser.save();
        res
        .status(201)
        .json({message: 'Account Created Successfully'})
    } catch (error) {
        next(error)
    }
}