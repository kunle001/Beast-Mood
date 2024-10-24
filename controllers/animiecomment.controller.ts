import { Request, Response } from "express";
import { AnimieComment } from "../models/comments.model";
import { Animie } from "../models/animies.model";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";

export class AnimieCommentController {
  public Create = catchAsync(async (req: Request, res: Response) => {
    const { message } = req.body;
    const animieId = req.params.animieId;
    const existingUser = req.user?._id;

    const isAnimeExist = await Animie.findById(animieId);
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
      user: existingUser,
      animieId,
    });

    await comment.save();

    sendSuccess(res, 201, {
      message: "comment created successfully",
      success: true,
      comment,
    });
  });

  public GetOneAnimieComment = catchAsync(
    async (req: Request, res: Response) => {
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
      ]).sort({_id:1}).exec();;

      if (!comment) {
        throw new AppError("no animie with this Id", 404);
      }

      sendSuccess(res, 200, comment);
    }
  );

  public GetComments = async (req: Request, res: Response) => {
    try {
      const data = await AnimieComment.find();

      sendSuccess(res, 200, data);
    } catch (e: any) {
      throw new AppError(e, 500);
    }
  };

  public DeleteComment = catchAsync(async (req: Request, res: Response) => {
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
  });

  public UpdateComment = catchAsync(async (req: Request, res: Response) => {
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
  });

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
  });

  public toggleLike = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new AppError("User is not authenticated", 401); // Handle case where userId is undefined
    }
    
    const comment = await AnimieComment.findById(commentId);
    if (!comment) throw new AppError("Comment not found", 404);

    // Check if the user already liked the comment
    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      // Unlike the comment by pulling the userId from likes
      await AnimieComment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { likes: userId } },  // Removes userId from likes array
        { new: true }
      );
        sendSuccess(res, 200, "Comment unliked");
    } else {
      // Like the comment by adding the userId to the likes array
      await AnimieComment.findByIdAndUpdate(
        { _id: commentId },
        { $addToSet: { likes: userId } }, // Adds userId to likes array (if not already there)
        { new: true }
      );
      sendSuccess(res, 200, "Comment liked");
    }
});

public toggleUnLike = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new AppError("User is not authenticated", 401); // Handle case where userId is undefined
    }
    
    const comment = await AnimieComment.findById(commentId);
    if (!comment) throw new AppError("Comment not found", 404);

    // Check if the user already disLikes the comment
    const hasDisLikes = comment.disLikes.includes(userId);

    if (hasDisLikes) {
      // unDisLike the comment by pulling the userId from likes
      await AnimieComment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { disLikes: userId } },  // Removes userId from likes array
        { new: true }
      );
      sendSuccess(res, 200, "Comment undiSLiked");
    } else {
        // disLikes the comment by adding the userId to the likes array
        await AnimieComment.findByIdAndUpdate(
          { _id: commentId },
          { $addToSet: { disLikes: userId } }, // Adds userId to disLikes array (if not already there)
          { new: true }
        );
        sendSuccess(res, 200, "Comment disLikes");
      }
  });
}
