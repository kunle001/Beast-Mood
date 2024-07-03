import express from "express";
import { CommentController } from "../controllers/episodeComment.controller";
import { authenticate } from "../utils/auth";
const router = express.Router();
const commentController = new CommentController();

router
  .route("/createComment/:episodeId")
  .post(authenticate, commentController.Create);
router.route("/getComments").get(commentController.GetComments);
router
  .route("/editComment/:id")
  .put(authenticate, commentController.UpdateComment);
router
  .route("/deleteComment/:commentId/delete/:episodeId")
  .delete(authenticate, commentController.DeleteComment);
router
  .route("/replyComment/:commentId/reply/:episodeId")
  .post(authenticate, commentController.ReplyComment);
router
  .route("/like/:commentId")
  .post(authenticate, commentController.likeComment);

router
  .route("/unlike/:commentId")
  .post(authenticate, commentController.unlikeComment);

export { router as EpisodeCommentRouter };
