import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from "../model/User";

export const getJwtPayload = (token: string) => {
    if (!token) {
        return null
    }
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Page Not Found",
        })
    }
    try{
        const decodeData = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;
        const user = await User.findOne({ _id: decodeData?._id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Page Not Found",
            })
        }
        return next();
    }catch(err){
        console.log((err as Error).message);
        return res.status(500).json({
            success : false,
            message : "Server Error"
        })
    }
})



export default protect;
