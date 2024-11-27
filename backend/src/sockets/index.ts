import { Server } from "socket.io";
import UserJoin from "./UserJoin";
import { ObjectId } from "mongoose";

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

            socket.on("user:move", ({user, spaceId})=>{
                console.log(user);
                this.io.to(spaceId).emit("user:moved" , {user});
            });
            
            socket.on("user-disconnect", async({spaceId, userId}) => {
                const notConnectedUser = await UserJoin.removeUser(spaceId as ObjectId, userId as ObjectId);
                this.io.to(spaceId).emit("user:left", {users : notConnectedUser?.members});
            })
        })
    }

}

export default SocketInstance;