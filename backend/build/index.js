"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const WorkSpace_1 = __importDefault(require("./routes/WorkSpace"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = require('http').createServer(app); // Create an HTTP server using Express
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", Auth_1.default);
app.use("/api", WorkSpace_1.default);
// Socket.IO connectio
io.on("connection", (socket) => {
    let spaceRoom;
    // socket?.emit("joining:request" , {spaceId, members : responce.data.data.space.members})
    socket.on("joining:request", ({ spaceId, members }) => {
        socket.join(spaceId);
        console.log({ spaceId });
        io.to(spaceId).emit("join-user", { members });
    });
    socket.on("move", data => {
        io.to(data.spaceId).emit("user:move", data);
    });
});
// Start the server on port 8000
server.listen(8000, () => {
    console.log("Server is running on port 8000");
});
