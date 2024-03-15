import mongoose, {Types, ObjectId, Document, Schema } from "mongoose";

export interface IUser extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds(1h)
  },
});
const Token = mongoose.model("Token", tokenSchema);

export default Token;