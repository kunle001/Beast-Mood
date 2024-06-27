import { Request, Response } from "express";
import { EpisodeComment } from "../models/comments.model";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import { Episode } from "../models/episodes.model.";


export class CommentController{
  public Create = catchAsync(async(req:Request, res:Response)=>{

    const { message } = req.body;
    const episodeId = req.params.episodeId;
    const existingUser = req.user?._id

    const isAnimeExist = await Episode.findById(episodeId)
    
    if (!isAnimeExist){
      throw new AppError("Episode does not exist", 404)
    }

    // validate of input
    if (!message) {
      return res.status(403).send({
        success: false,
        message: "Input are required",
      });
    }

    const comment = new EpisodeComment({
      message,
      userId: existingUser,
      episodeId,
    })

    await comment.save();

    sendSuccess(res, 201 ,{
      message: "comment created successfully",
      success: true,
      comment
    })
  })

  public GetComments = async(req:Request, res:Response)=>{
    try{
      const data= await EpisodeComment.find()

    sendSuccess(res,200,data)
    }catch(e:any){
      throw new AppError(e, 500)
    }
    
  }
  public GetOneEpisodeComment = catchAsync(async(req:Request, res:Response)=>{
    const comment = await EpisodeComment.findById(req.params.id)
    
    if (!comment){
      throw new AppError("no comment with this Id", 404)
    }

    sendSuccess(res,200,comment)
  })

  public DeleteComment = catchAsync(async(req:Request, res:Response)=>{

    const comment = await EpisodeComment.findById(req.params.id)

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
    const comment = await EpisodeComment.findById(req.params.id)

    if (!comment){
        throw new AppError("No Comment with this id found", 404)
    }

    if(comment.userId == req.body.userId){
        await EpisodeComment.updateOne(
          {$set: req.body},
        )
    }else {
        throw new AppError("sorry you cant perform this!", 400)
    }

    sendSuccess(res, 200, comment)
  })

  public ReplyComment = catchAsync(async(req:Request, res:Response)=>{
  
    const {commentId, episodeId} = req.params;
    const {message} = req.body;
    const existingUser = req.user?._id;

    // validate of input
    if (!message) {
      throw new AppError("Reply can't be enpty", 404)
    }
    const replyObj = {
      userId:existingUser,
      episodeId,
      message,
      parentComment:commentId
    }

    const newReply = await new EpisodeComment(replyObj).save();
    const allReply = await EpisodeComment.findOneAndUpdate({_id:commentId, episodeId}, {$push:{replies:newReply._id}}).populate({
      path: 'parentComment',
      populate: { path: 'parentComment', populate: { path: 'parentComment', /* continue as deep as necessary */ } }
    }).exec();;


    sendSuccess(res, 200, allReply)
    
  })
};
