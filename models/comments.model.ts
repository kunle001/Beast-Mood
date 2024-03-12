import mongoose, {Types, ObjectId, Document, Schema } from "mongoose";

export interface IUser extends Document {
  userName: Types.ObjectId;
  animie: Types.ObjectId;
  message: string;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  animie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animie"
}, 
  message: {
    type: String,
    required: true,
  },
});


const Comment = mongoose.model("Comment", userSchema);

export default Comment;