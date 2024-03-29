import mongoose, {Types, ObjectId, Document, Schema } from "mongoose";

export interface IOTP extends Document {
  userId: Types.ObjectId;
  hashedOTP: string;
  createdAt: Date;
  expiresAt: Date
}

const userOTPSchema = new mongoose.Schema<IOTP>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  hashedOTP: {
    types: String
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});
const UserOTPrecord = mongoose.model("UserOTPrecord", userOTPSchema);

export default UserOTPrecord;
