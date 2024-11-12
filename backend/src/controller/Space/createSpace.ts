import { Request, Response } from "express";
import WorkingSpace from "../../model/WorkingSpace";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../model/User";

const createWorkingSpace = async (req: Request, res: Response): Promise<any> => {
    const { spaceName, numberOfMembers } = req.body;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    console.log(decoded);
    
    if (!decoded) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId: string = decoded._id;

    console.log(userId);
    
    try {
        const admin = await User.findById(userId);

        if (!admin) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        if (!spaceName) {
            return res.status(400).json({ success: false, message: "Space name is required" });
        }
        const workingSpace = await WorkingSpace.create({ spaceName, numberOfMembers, admin: userId });
        if (!workingSpace) {
            return res.status(400).json({ success: false, message: "Working space not created" });
        }

        const workingSpaceData = await WorkingSpace.findById(workingSpace._id).populate("members").populate("admin", "-password");
        if (!workingSpaceData) {
            return res.status(400).json({ success: false, message: "Working space not found" });
        }

        return res.status(201).json({ success: true, message: "Working space created successfully", data: workingSpaceData});
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export default createWorkingSpace;