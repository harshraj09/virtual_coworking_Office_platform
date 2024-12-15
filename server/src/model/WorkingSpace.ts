import mongoose from "mongoose";

interface IWorkingSpace extends mongoose.Document {
    id: string;
    spaceName: string;
    members: mongoose.Schema.Types.ObjectId[];
    admin: mongoose.Schema.Types.ObjectId;
    numberOfMembers: number;
    chats : mongoose.Schema.Types.ObjectId[];
}

const workingSpaceSchema = new mongoose.Schema<IWorkingSpace>({
    spaceName: { type: String, required: true },    
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    numberOfMembers: { type: Number, default: 2 },
    chats : [{type : mongoose.Schema.Types.ObjectId, ref : "Chat"}]
}, { timestamps: true });

const WorkingSpace = mongoose.model<IWorkingSpace>("WorkingSpace", workingSpaceSchema);

export default WorkingSpace;