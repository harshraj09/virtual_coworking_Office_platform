import { Request, Response } from "express";
import User from "../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET as string);
        return res.json({
            success: true,
            message: "Login successful",
            data: {
                token, 
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    position: user.position
                }
            }
        });
    } catch (err) {
        return res.json({ success: false, message: "Internal server error", error: (err as Error).message });
    }
};

export default loginUser;
