import mongoose, {Types, Document, Schema } from "mongoose";

export interface IOTP extends Document {
  userId:string;
  hashedOTP: string;
  createdAt: Date;
  expiresAt: Date
}

const userOTPSchema = new Schema<IOTP>({
  userId:String,
  hashedOTP: String,
  createdAt: Date,
  expiresAt:Date,
});
const UserOTPRecord = mongoose.model("UserOTPRecord", userOTPSchema);

export default UserOTPRecord;
