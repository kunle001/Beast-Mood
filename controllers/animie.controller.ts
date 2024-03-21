import { Request, Response } from "express";
import cloudinary from "cloudinary"
import { Animie } from "../models/animies.model";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";



export class AnimieController {

    public GetAnimies = async(req:Request, res:Response)=>{
      try{
        const data= await Animie.find()

      sendSuccess(res,200,data)

      }catch(e:any){
        throw new AppError(e, 500)
      }
      
    }

    public GetOneAnimie= catchAsync(async(req:Request, res:Response)=>{
      const animie= await Animie.findById(req.params.id).populate("episodes")
      
      if (!animie){
        throw new AppError("no animie with this name", 404)
      }

      sendSuccess(res,200,animie)
    })

    public CreateAnimie= catchAsync(async(req:Request, res:Response)=>{
      const {title, genre,description,image}= req.body
      const animie = Animie.build({
        title, genre,description,image
      })

      await animie.save()

      sendSuccess(res, 201, animie)
    })

    public DeleteAnimie= catchAsync(async(req:Request, res:Response)=>{
      const animie= await Animie.findByIdAndDelete(req.params.id)
      if (!animie){
        throw new AppError("No animie with this id found", 404)
      }
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