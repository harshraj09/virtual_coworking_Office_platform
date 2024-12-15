import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  position: { x: number, y: number }
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  position: {
    x: {
      type: Number,
      default: Math.floor((Math.random() * 51) + 50)
    },
    y: {
      type: Number,
      default : Math.floor((Math.random() * 51) + 50)
    }
  }
}, { timestamps: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
