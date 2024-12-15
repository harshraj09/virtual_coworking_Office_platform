import { Server } from "socket.io";

class ChatInstance {
    private io: Server;
    constructor(io: Server<any>) {
        this.io = io;
        this.socketInit();
    }

    private socketInit() {
        this.io.on("connection", (socket) => {
            socket.on("send_message", async (data) => {
                const  {sender, time , spaceId, message} = data;
                // const newMessage = await this.createMessage(message as string, spaceId as string, userId as string, chatId as string);
                // console.log({newMessage});
                console.log({data});
                this.io.to(spaceId).emit("new_message", {sender ,time , message});
            })
        })
    }
}

export default ChatInstance;
