"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
__1.io.on("connection", (socket) => {
    console.log("New Connection");
    socket.on("join-room", data => {
        console.log("User Joined");
        const { roomId, emailId } = data;
        socket.join(roomId);
    });
});
