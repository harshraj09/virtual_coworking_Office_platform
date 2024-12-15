import { Server } from "socket.io";
import UserJoin from "./UserJoin";
import { ObjectId } from "mongoose";
import User from "../model/User";

class SocketInstance {
    private io: Server;
    constructor(io: Server<any>) {
        this.io = io;
        this.socketInit();
    }

    private socketInit() {
        this.io.on("connection", (socket) => {
            socket.on("join:request", async({userId , spaceId}) => {
                const newUser = await UserJoin.newUserJoin(spaceId, userId);
                socket.join(spaceId);
                this.io.to(spaceId).emit("join:success" ,{users : newUser?.members});
            })

            socket.on("user:move",({user, spaceId})=>{
                setTimeout(()=>{
                    this.io.to(spaceId).emit("user:moved" , {user});
                }, 30);
                // this.updateUserPostion(user._id as string, user.position);
            });
            
            socket.on("user-disconnect", async({spaceId, userId}) => {
                const notConnectedUser = await UserJoin.removeUser(spaceId as ObjectId, userId as ObjectId);
                this.io.to(spaceId).emit("user:left", {users : notConnectedUser?.members});
            })
        })
    }
    private async updateUserPostion (userId : string, position : any){
        try{
            await User.findByIdAndUpdate({
                _id : userId
            },{
                $set : { position : position}
            }, {new : true});
        }catch(err){
            console.log((err as Error).message);
        }
    }
}

export default SocketInstance;
