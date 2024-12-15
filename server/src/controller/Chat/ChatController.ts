import { Request, Response } from "express";
import Chat from "../../model/Chat";
import expressAsyncHandler from "express-async-handler";

export const createChat = expressAsyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { spaceId, userId, adminId } = req.body;

    if (!spaceId || !userId || !adminId) {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing: spaceId, userId, or adminId",
        });
    }

    // Check if the chat already exists
    const findSpace = await Chat.findOne({
        space: spaceId,
        users: { $in: [userId, adminId] }, // Check for users in the chat
    });

    console.log("Query Result:", findSpace);

    if (findSpace) {
        return res.status(200).json({
            success: true,
            message: "Chat already exists",
            chat: findSpace, // Return the existing chat
        });
    }

    // Create a new chat
    const chatCreate = await Chat.create({
        users: [userId, adminId], // Direct array of ObjectIds
        space: spaceId,
    });

    const newChat = await Chat.findById(chatCreate._id)
        .populate("users", "-password -position")
        .populate("space", "-password");

    return res.status(201).json({
        success: true,
        message: "Chat created successfully",
        chat: newChat,
    });
});
