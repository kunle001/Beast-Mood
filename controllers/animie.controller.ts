import { Request, Response } from "express";
import cloudinary from "cloudinary"
import { Animie } from "../models/animies";
import catchAsync from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";


cloudinary.v2.config({
  cloud_name: 'dx8obnscc',
  api_key: '568434899362299',
  api_secret: 'eQNZbRpMwAMQVbHNHKatckaGMcQ',
  secure: true,
});


export class AnimieController{

    public GetAnimies = catchAsync(async(req:Request, res:Response)=>{
      const data= await Animie.find()

      sendSuccess(res,200,data)
    })

    public GetOneAnimie= catchAsync(async(req:Request, res:Response)=>{
      const animie= await Animie.findOne({title: req.body.title})
      
      if (!animie){
        throw new AppError("no animie with this name", 404)
      }
    })

    public CreateAnimie= catchAsync(async(req:Request, res:Response)=>{
      const animie = await Animie.create({
        ...req.body
      })

      sendSuccess(res, 201, animie)
    })

    public DeleteAnimie= catchAsync(async(req:Request, res:Response)=>{
      await Animie.findByIdAndDelete(req.params.id)

      sendSuccess(res, 201, "animie deleted successfully")
    })

    public UpdateAnimie= catchAsync(async(req:Request, res:Response)=>{
      const animie = await Animie.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
      })

      sendSuccess(res, 201, animie)
    })
}