import { Request, Response } from "express";
import WorkingSpace from "../../model/WorkingSpace";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../model/User";

const createWorkingSpace = async (req: Request, res: Response): Promise<any> => {
    const { spaceName, numberOfMembers } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;
        if (!decoded) {
            return res.json({ success: false, message: "Invalid Token" });
        }
        const userId: string = decoded._id;
        const admin = await User.findById(userId);
        if (!admin) {
            return res.json({ success: false, message: "You Are Not Logged In." });
        }
        if (!spaceName) {
            return res.json({ success: false, message: "Space name is required" });
        }
        const checkSpace = await WorkingSpace.findOne({ spaceName : spaceName})
        if(checkSpace) {
            return res.json({
                success : false, 
                message : "Space is Already exist with this Name."
            })
        }
        const workingSpace = await WorkingSpace.create({ spaceName, numberOfMembers, admin: userId });
        if (!workingSpace) {
            return res.json({ success: false, message: "Working space not created" });
        }
        const workingSpaceData = await WorkingSpace.findById(workingSpace._id).populate("members").populate("admin", "-password");
        if (!workingSpaceData) {
            return res.json({ success: false, message: "Working space not found" });
        }
        return res.json({ success: true, message: "Working space created successfully", data: workingSpaceData });
    } catch (err) {
        return res.json({ success: false, message: "Internal server error", error: (err as Error).message });
    }
}

export default createWorkingSpace;