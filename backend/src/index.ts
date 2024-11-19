import express from "express";
import authRoutes from "./routes/Auth";
import connectDB from "./config/db";
import dotenv from "dotenv";
import WorkSpace from "./routes/WorkSpace";
import cors from "cors";
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = require('http').createServer(app); // Create an HTTP server using Express
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", WorkSpace);

// Socket.IO connectio
io.on("connection", (socket) => {
  let spaceRoom: string;
  // socket?.emit("joining:request" , {spaceId, members : responce.data.data.space.members})
  socket.on("joining:request", ({ spaceId, members }) => {
    socket.join(spaceId);
    console.log({spaceId});
    io.to(spaceId).emit("join-user", { members });
  });

  socket.on("move", data => {
    io.to(data.spaceId).emit("user:move", data);
  })

})
// Start the server on port 8000
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});