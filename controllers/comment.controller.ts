import { Request, Response } from "express";
import Comment from '../models/comments';
import { Animie } from "../models/animies";
import catchAsync from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";


export class CommentController{
  public CreateComment = catchAsync(async(req:Request, res:Response)=>{

    const comment = new Comment(req.body);
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
    .save()
    .then(() => Animie.findById(req.params.postId))
    .then((animie) => {
      animie.comments.unshift(comment);
      return animie.save();
    })
    .then(() =>  sendSuccess(res, 201, comment))
    .catch((err) => {
      console.log(err);
    });
  })
}