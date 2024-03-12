import mongoose, {Types, Document, Schema } from "mongoose";

export interface IUser extends Document {
  userId: string;
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
module.exports = mongoose.model("Token", tokenSchema);