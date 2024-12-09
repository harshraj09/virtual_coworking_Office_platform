import { Server } from "socket.io";

class VideoInstance {
    private io: Server;
    constructor(io: Server<any>) {
        this.io = io;
        this.socketInit();
    }

    private socketInit() {
        this.io.on("connection", (socket) => {
            socket.on("create_offer", data=>{
                const {spaceId, userId, offer} = data;
                this.io.to(spaceId).emit("send_offer", {userId, offer});
            })
            socket.on("create_answer", data=>{
                const {userId, spaceId, answer} = data;
                this.io.to(spaceId).emit("send_ans", {userId, answer});
            })
        })
    }

}

export default VideoInstance;
