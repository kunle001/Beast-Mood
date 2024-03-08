import mongoose, {Types, Document, Schema } from "mongoose";

export interface IComment extends Document {
  name: string;
  animie: Types.ObjectId;
  message: string;
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
  }
}, { timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;