import mongoose, {Types, Document, Schema } from "mongoose";

export interface IComment extends Document {
  name: string;
  animie: Types.ObjectId;
  message: string;
  creationDate:Date;
}


const commentSchema = new Schema<IComment>({
  name: {
    type: String,
    required: true,
  },
  animie: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"Animie", 
    required: true 
  },
  message: {
    type: String,
    required: true,
  },
  creationDate: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;