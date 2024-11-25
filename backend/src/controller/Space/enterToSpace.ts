import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import WorkingSpace from "../../model/WorkingSpace";

const enterToSpace = expressAsyncHandler(async(req : Request, res : Response):Promise<any> => {
    const {spaceId, userId} : {spaceId : string, userId : string} = req.body;
    if(!spaceId || !userId) {
        return res.json({
            success : false,
            message : "Requirement Not Satisfied"
        })
    }
    // Check if user is already a member before adding
    const existingSpace = await WorkingSpace.findOne({_id : spaceId, members : userId}).populate("members" , "-password").populate("admin", "-password");


    if (existingSpace) {
        return res.json({
            success: true,
            message: "User is already a member",
            data : {
                space : existingSpace
            }
        }); // Exit early if user is already a member
    }

    const addToSpace = await WorkingSpace.findOneAndUpdate(
        {
            _id : spaceId
        },{
            $push : {members : userId}
        },{
            new : true
        }
    ).populate("members" , "-password").populate("admin", "-password")

    

    if(!addToSpace) {
        const isAdmin = await WorkingSpace.findOne({admin : userId});
        if(isAdmin){
            return res.json({
                success : true,
                message  : "Admin Join the Room"
            })
        }
        return res.json({
            success :false,
            message : "Not Added To Space"
        })
    } else {
        
        return res.json({
            success: true,
            message: "Successfully Added",
            data : {space : addToSpace}
        })
    }
})

const removeFromSpace = expressAsyncHandler(async(req : Request, res : Response):Promise<any> => {
    const {spaceId, userId} = req.body;

    if(!spaceId || !userId) {
        return res.json({
            success : false,
            message : "Requirement Not Satisfied"
        })
    }

    const exitSpace = await WorkingSpace.findOneAndUpdate(
        {
            _id : spaceId
        },{
            $pull : {members : userId}
        },{
            new : true
        }
    ).populate("members" , "-password").populate("admin", "-password")

    if(!exitSpace) {
        return res.json({
            success :false,
            message : "Not Added To Space"
        })
    }else{
        return res.json({
            success : true,
            message : "Successfully Added",
            data : {exitSpace}
        })
    }
})


export {enterToSpace, removeFromSpace};