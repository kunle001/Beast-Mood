import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Roles } from "../utils/constant";

export interface IUser extends Document {
  googleId:string,
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profilePic:string;
  verifiedEmail:boolean,
  roles:string[];
  comparePassword: (enteredPassword: string) => boolean;
  resetToken:string;
  _doc?:any
}

const userSchema = new Schema<IUser>({
  googleId: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  first_name: String,
  last_name: String,
  password: {
    type: String,
    required: true,
  },
  profilePic: { type: String },
  resetToken: {
    type: String,
  },
  verifiedEmail: {
    type: Boolean, 
    default: false 
  },
  roles: {
    type: [String],
    required: true,
    default: [Roles.User],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;