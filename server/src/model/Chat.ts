import  mongoose from "mongoose";

interface IChat extends mongoose.Document {
    users : mongoose.Schema.Types.ObjectId[],
    messages : mongoose.Schema.Types.ObjectId[],
    space : mongoose.Schema.Types.ObjectId,
}

const chatSchema = new mongoose.Schema<IChat>({
  users : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
  ],
  messages : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Message"
  }],
  space : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "WorkingSpace"
  }
}, { timestamps: true });

const Chat = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
