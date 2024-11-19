import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import WorkingSpace from "../../model/WorkingSpace";

const sendSpaces = expressAsyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { spaceId } = req.params;

    const space = await WorkingSpace.findById(spaceId).populate("members" , "-password").populate("admin", "-password");

    if (!space) {
        return res.json({ success : false,  message: "Workspace not found" });
    }

    
    
    return res.status(200).json({
        success : true,
        message : "Request Successfull",
        data  : {
            space
        }
    });
})

export default sendSpaces;