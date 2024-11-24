import { Request, Response } from "express";
import User from "../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signupUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }
    try {
        const userExists = await User.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ name, email, password: hashedPassword , avatar : name});
        if (!user) {
            return res.json({ success: false, message: "User not created" });
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET as string);

        return res.json({
            success: true,
            message: "Signup successful",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    position : user.position
                }
            }
        });

    } catch (err) {
        return res.json({ success: false, message: "Internal server error" });
    }
};

export default signupUser;
