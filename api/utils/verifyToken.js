import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.access_token ;

    if(!accessToken) return next (errorHandler(401,'Unauthorized'));

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'Forbidden'));

        req.user =user;
        next();
    })
}