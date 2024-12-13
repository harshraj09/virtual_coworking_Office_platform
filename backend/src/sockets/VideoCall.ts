// Importing required modules
import { Server } from "socket.io";

class VideoInstance {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
        this.socketInit();
    }

    private socketInit() {
        this.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            socket.on("user_call", ({ user1, user2, spaceId, offer })=>{
                const remoteId = user2._id;
                socket.join(spaceId)
                this.io.to(spaceId).emit("user_calling", {remoteId , offer, spaceId})
            });
            socket?.on("send_answer", ({remoteId, spaceId, answer})=>{
                this.io.to(spaceId).emit("send_final_answer", {remoteId, answer});
            });
        });
    }
}

export default VideoInstance;
