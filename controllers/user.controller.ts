import { Request, Response } from "express";
import cloudinary from "cloudinary"
import User from "../models/user";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import cryptoJs from "crypto-js";


cloudinary.v2.config({
  cloud_name: 'dx8obnscc',
  api_key: '568434899362299',
  api_secret: 'eQNZbRpMwAMQVbHNHKatckaGMcQ',
  secure: true,
});


export class UserController{

    public GetUsers = catchAsync(async(req:Request, res:Response)=>{
      const data = await User.find().select(
        [ "-password"]
       );

      sendSuccess(res,200,data)
    })

    public GetOneUser= catchAsync(async(req:Request, res:Response)=>{

      const user = await User.findById(req.params.id).select(
        [ "-password"]
       );
    
      if (!user){
        throw new AppError("User does not exist", 404)
      }

      return sendSuccess(res, 200, user)
      
    })

     public UpdateUser = catchAsync(async(req:Request, res:Response)=>{
      if(req.body.password) req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.JWT_SECRET!).toString();

      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
      }).select(
        ["-password"])

      sendSuccess(res, 201, user)
    })

    public DeleteUser = catchAsync(async(req:Request, res:Response)=>{
      await User.findByIdAndDelete(req.params.id)

      sendSuccess(res, 201, "User deleted successfully")
    })

}
import { Request, Response } from "express";
import cloudinary from "cloudinary"
import User from "../models/user.model";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import cryptoJs from "crypto-js";


cloudinary.v2.config({
  cloud_name: 'dx8obnscc',
  api_key: '568434899362299',
  api_secret: 'eQNZbRpMwAMQVbHNHKatckaGMcQ',
  secure: true,
});


export class UserController{

    public GetUsers = catchAsync(async(req:Request, res:Response)=>{
      const data = await User.find().select(
        [ "-password"]
       );

      sendSuccess(res,200,data)
    })

    public GetOneUser= catchAsync(async(req:Request, res:Response)=>{

      const user = await User.findById(req.params.id).select(
        [ "-password"]
       );
    
      if (!user){
        throw new AppError("User does not exist", 404)
      }

      return sendSuccess(res, 200, user)
      
    })

     public UpdateUser = catchAsync(async(req:Request, res:Response)=>{
      if(req.body.password) req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.JWT_SECRET!).toString();

      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
      }).select(
        ["-password"])

      sendSuccess(res, 201, user)
    })

    public DeleteUser = catchAsync(async(req:Request, res:Response)=>{
      await User.findByIdAndDelete(req.params.id)

      sendSuccess(res, 201, "User deleted successfully")
    })

}