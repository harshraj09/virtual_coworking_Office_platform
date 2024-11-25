import { ObjectId } from "mongoose";
import WorkingSpace from "../model/WorkingSpace";

class UserJoin {
    public async newUserJoin (spaceId:ObjectId, userId : ObjectId){
        if(!userId) return;

        const existingUser = await WorkingSpace.findOne({
            _id : spaceId,
            members : userId
        }).populate("members", "-password -email -avatar -__v -createdAt -updatedAt");

        if(existingUser) return existingUser;

        const newUserJoin = await WorkingSpace.findOneAndUpdate({
            _id : spaceId,
        }, {$push : {members : userId}}, {new : true}).populate("members", "-password -email -avatar -__v -createdAt -updatedAt")
        return newUserJoin;
    }

    public async removeUser (spaceId : ObjectId, userId : ObjectId){
        if(!userId) return;
        const removeFromSpace = await WorkingSpace.findOneAndUpdate({
            _id : spaceId
        }, {$pull : { members : userId}}, {new : true}).populate("members", "-password -email -avatar -__v -createdAt -updatedAt");
        return removeFromSpace;
    }
}

export default new UserJoin;