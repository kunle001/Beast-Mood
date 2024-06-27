import express from "express"
import { AnimieCommentController } from "../controllers/animiecomment.controller"
import { authenticate } from "../utils/auth"
const router= express.Router()
const commentController= new AnimieCommentController()


router.route("/createComment/:animieId").post(authenticate, commentController.Create)
router.route("/getAllComment").get(commentController.GetComments)
router.route("/getOneComment/:id").get(commentController.GetOneAnimieComment)
router.route("/updateComment/:id").put(authenticate, commentController.UpdateComment)
router.route("/deleteComment/:id").delete(authenticate, commentController.DeleteComment)
router.route("/replyComment/:commentId/reply/:animeId").post(authenticate, commentController.ReplyComment)


export {router as AnimieCommentRouter}