import express from "express";
import authRoutes from "./routes/Auth";
import connectDB from "./config/db";
import dotenv from "dotenv";
import WorkSpace from "./routes/WorkSpace";
import cors from "cors";
import { createServer } from "http";
import { Server } from 'socket.io'
import SocketInstance from "./sockets";
import VideoInstance from "./sockets/VideoCall";
import ChatInstance from "./sockets/Chat";
import ChatRoutes from "./routes/Chat";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
const server = createServer(app);

connectDB();

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", WorkSpace);
app.use("/api", ChatRoutes);

new SocketInstance(io);
new VideoInstance(io);
new ChatInstance(io);

server.listen(port as number, () => {
  console.log("Server is running on port 8000");
});
