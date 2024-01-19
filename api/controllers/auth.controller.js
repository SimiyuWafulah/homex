import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({ $or : [{email}, {username}]})
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


export const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'Account does not exist'));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(404,'Wrong credentials'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password : pass, ...rest} = validUser._doc
        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}