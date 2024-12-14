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
            socket.on("user_call", ({ userName, userId, spaceId }) => {
                socket.join(spaceId)
                this.io.to(spaceId).emit("user_calling", userName, userId);
            });
            socket?.on("send_answer", ({ userName, spaceId, userId }) => {
                console.log({ userName, spaceId, userId });
                this.io.to(spaceId).emit("send_final_answer", { userName, userId });
            });

            socket.on('get_stream', (data) => {
                console.log({ data });
            })
        });
    }
}

export default VideoInstance;
