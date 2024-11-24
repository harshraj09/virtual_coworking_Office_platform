import express from "express";
import authRoutes from "./routes/Auth";
import connectDB from "./config/db";
import dotenv from "dotenv";
import WorkSpace from "./routes/WorkSpace";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import User from "./model/User";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", WorkSpace);



const spaces = new Map;

io.on("connection", (socket) => {
  socket.on("joining:request", data =>{
    const {spaceId, members} = data;
    socket.join(spaceId);
    spaces.set(spaceId, members);
    console.log("Data From Client : ", {spaceId, members});
    console.log("This is spaces : ", spaces);
    const spaceData = spaces.get(spaceId);
    io.in(spaceId).emit("new_user_join", spaceData);
  })
  
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
