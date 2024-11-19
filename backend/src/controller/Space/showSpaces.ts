import { Request, Response } from "express";
import { getJwtPayload } from "../../middleware/Protect";
import WorkingSpace from "../../model/WorkingSpace";
import expressAsyncHandler from "express-async-handler";


const showSpaces = expressAsyncHandler(async (req: Request, res: Response): Promise<any> => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json({
            success: false,
            message: "You are not Authorized"
        })
    }

    const decodedData = getJwtPayload(token);

    const adminId = decodedData?._id;
    const searchQuery = { admin: adminId };
    const spaces = await WorkingSpace.find(searchQuery).populate("members").populate("admin", "-password");
    if (!spaces) {
        return res.json({ success: false, message: "Spaces not found" });
    }
    return res.json({ success: true, message: "Spaces found", data: spaces });
})

export default showSpaces;