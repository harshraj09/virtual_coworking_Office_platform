import express from "express";
import authRoutes from "./routes/Auth";
import connectDB from "./config/db";
import dotenv from "dotenv";
import WorkSpace from "./routes/WorkSpace";
import cors from "cors";
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", WorkSpace);

app.post("/", (req, res) => {
  const {name, email, password} = req.body;
  res.json({name, email, password});
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

