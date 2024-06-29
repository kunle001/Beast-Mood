import { Request, Response } from "express";
import {AnimieComment}  from "../models/comments.model";
import { Animie } from "../models/animies.model";
import {catchAsync} from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import mongoose from 'mongoose';

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
    const comment = await AnimieComment.findById(req.params.id).populate([
      {
        path:"userId",
        model: "User",
        select:"name profilePic"},

      {
        path: 'parentComment'
      },
      {
        path: 'parentComment', 
        populate: { path: 'parentComment', /* continue as deep as necessary */ 
      }
      },
    ]).sort({_id:1}).exec();
    
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
    const {commentId, animieId} = req.params;
    const userId = req.user?._id
    const comment= await AnimieComment.findById({_id:commentId, animieId}).lean();

    if (!comment){
      throw new AppError("No Comment with this id found", 404)
    }

    if(comment && comment.userId.toString() == userId){
        await AnimieComment.deleteMany({_id:{$in:comment.replies}})
          await AnimieComment.deleteOne({_id:commentId});
    } else {
      throw new AppError("sorry you cant perform this!", 400,)
    }

    sendSuccess(res, 200, "Comment deleted successfully")

  })

  public UpdateComment = catchAsync(async(req:Request, res:Response)=>{
    const userId = req.user?._id
    const comment = await AnimieComment.findById(req.params.id)

    if (!comment){
        throw new AppError("No Comment with this id found", 404)
    }

    if(comment && comment.userId.toString() == userId){
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
    await AnimieComment.findOneAndUpdate({_id:commentId, animieId}, {$push:{replies:newReply._id}});

    sendSuccess(res, 200, newReply)
  })

  // public toggleLike = catchAsync(async(req:Request, res:Response)=>{
  //   const {commentId} = req.params;
  //   const userId = req.user?._id; // Assuming req.user contains user information

  //   const comment = await AnimieComment.findById(commentId);

  //   if (!comment){
  //     throw new AppError("Comment not found", 404)
  //   }
  //  //Lets Check if the user has already liked the particular ecomment
  //   const isLiked = comment.likes.some(like => like.equals(userId)); // Check if userId is already in likes array;

  //   if(isLiked){
  //     // User has already liked the comment, unlike it
  //     comment.likes = comment.likes.filter(like => !like.equals(userId))
  //   }else{
  //     // If the User hasn't liked the comment, like it
  //     comment.likes.push((userId)); //this line was given error
      
  //   }

  //   await comment.save();

  //   sendSuccess(res, 200, "Comment Liked/Unliked")
  // })

  public likeComment = catchAsync(async(req:Request, res:Response)=>{
    const {commentId} = req.params;
    const userId = req.user?._id;

    await AnimieComment.findByIdAndUpdate(
      {_id:commentId},
      // Add userId to likes array if not already present
      { $addToSet: { likes: userId } },
      { new: true }
  );

    sendSuccess(res, 200,"Comment liked")
  })

  public unlikeComment = catchAsync(async(req:Request, res:Response)=>{
    const {commentId} = req.params;
    const userId = req.user?._id;

    await AnimieComment.findByIdAndUpdate(
      {_id:commentId},
       // Remove userId from likes array
      { $pull: { likes: userId } },
      { new: true }
  );

    sendSuccess(res, 200, "Comment Unliked")
  })
};
