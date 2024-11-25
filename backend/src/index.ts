import express from "express";
import authRoutes from "./routes/Auth";
import connectDB from "./config/db";
import dotenv from "dotenv";
import WorkSpace from "./routes/WorkSpace";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from 'socket.io'
import SocketInstance from "./sockets";

dotenv.config();

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

new SocketInstance(io);


server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
