import { Request, Response } from "express";
import  Comment  from "../models/comments.model";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";


export class CommentController{
  public Create = catchAsync(async(req:Request, res:Response)=>{
    const { message, userName, animie } = req.body;
    const comment = new Comment({ userName, message, animie });
    await comment.save();

    sendSuccess(res, 201, comment)
  })

  public GetComments = async(req:Request, res:Response)=>{
    try{
      const data= await Comment.find()

    sendSuccess(res,200,data)
    }catch(e:any){
      throw new AppError(e, 500)
    }
    
  }

  public DeleteComment = catchAsync(async(req:Request, res:Response)=>{
    const comment= await Comment.findByIdAndDelete(req.params.id)
    if (!comment){
      throw new AppError("No Comment with this id found", 404)
    }

    sendSuccess(res, 201, "Comment deleted successfully")
  })

  public UpdateComment = catchAsync(async(req:Request, res:Response)=>{
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true
    })

    sendSuccess(res, 201, comment)
  })
};
