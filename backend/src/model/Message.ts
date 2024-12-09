import  mongoose from "mongoose";

interface IMessage extends mongoose.Document {
  content : string,
  sender : mongoose.Schema.Types.ObjectId,
  chat : mongoose.Schema.Types.ObjectId,
}

const userSchema = new mongoose.Schema<IMessage>({
  content : {
    type : String
  },
  sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  chat : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Chat"
  }
}, { timestamps: true });

const Message = mongoose.model<IMessage>("Message", userSchema);

export default Message;
