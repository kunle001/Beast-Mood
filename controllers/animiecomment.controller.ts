import { Request, Response } from "express";
import {AnimieComment}  from "../models/comments.model";
import { Animie } from "../models/animies.model";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";


export class AnimieCommentController{
  public Create = catchAsync(async(req:Request, res:Response)=>{

    const { message } = req.body;
    const animieId = req.params.animieId;
    const existingUser = req.user?._id

    const isAnimeExist = await Animie.findById(animieId)
    
    if (!isAnimeExist){
      throw new AppError("Anime does not exist", 404)
    }

    // validate of input
    if (!message) {
      return res.status(403).send({
        success: false,
        message: "Input are required",
      });
    }
  
    const comment = new AnimieComment({
      message,
      userId: existingUser,
      animieId,
    });

    await comment.save();

    sendSuccess(res, 201, {
      message: "comment created successfully",
      success: true,
      comment
    })
  })

  public GetOneAnimieComment = catchAsync(async(req:Request, res:Response)=>{
    const comment = await AnimieComment.findById(req.params.id)
    
    if (!comment){
      throw new AppError("no animie with this Id", 404)
    }

    sendSuccess(res,200,comment)
  })

  public GetComments = async(req:Request, res:Response)=>{
    try{
      const data= await AnimieComment.find()

    sendSuccess(res,200,data)
    }catch(e:any){
      throw new AppError(e, 500)
    }
    
  }

  public DeleteComment = catchAsync(async(req:Request, res:Response)=>{

    const comment= await AnimieComment.findById(req.params.id)

    if (!comment){
      throw new AppError("No Comment with this id found", 404)
    }

    if(comment.userId == req.body.userId){
      await comment.deleteOne();
    } else {
      throw new AppError("sorry you cant perform this!", 400)
    }

    sendSuccess(res, 200, "Comment deleted successfully")

  })

  public UpdateComment = catchAsync(async(req:Request, res:Response)=>{
    const comment = await AnimieComment.findById(req.params.id)

    if (!comment){
        throw new AppError("No Comment with this id found", 404)
    }

    if(comment.userId == req.body.userId){
        await AnimieComment.updateOne(
            {$set: req.body},
        )
    }else {
        throw new AppError("sorry you cant perform this!", 400)
    }

    sendSuccess(res, 200, comment)
  })

  public ReplyComment = catchAsync(async(req:Request, res:Response)=>{

    const {commentId, animieId} = req.params;
    const {message} = req.body;
    const existingUser = req.user?._id;

    // validate of input
    if (!message) {
      throw new AppError("Reply can't be enpty", 404)
    }
    const replyObj = {
      userId:existingUser,
      animieId,
      message,
      parentComment:commentId
    }

    const newReply = await new AnimieComment(replyObj).save();
    const result = await AnimieComment.findOneAndUpdate({_id:commentId, animieId}, {$push:{replies:newReply._id}}).populate({
      path: 'parentComment',
      populate: { path: 'parentComment', populate: { path: 'parentComment', /* continue as deep as necessary */ } }
    }).exec();;

    sendSuccess(res, 200, result)
  })
};
