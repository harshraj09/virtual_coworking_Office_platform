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
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const sockets_1 = __importDefault(require("./sockets"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
(0, db_1.default)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", Auth_1.default);
app.use("/api", WorkSpace_1.default);
new sockets_1.default(io);
server.listen(port, () => {
    console.log("Server is running on port 8000");
});
