import express from "express"
import { AnimieCommentController } from "../controllers/animiecomment.controller"
import { authenticate } from "../utils/auth"
const router= express.Router()
const commentController= new AnimieCommentController()


router.route("/createComment/:animieId").post(authenticate, commentController.Create)
router.route("/getAllComment").get(commentController.GetComments)
router.route("/getOneComment/:id").get(commentController.GetOneAnimieComment)
router.route("/updateComment/:id").put(commentController.UpdateComment)
router.route("/deleteComment/:id").delete(commentController.DeleteComment)
router.route("/replyComment/:commentId/reply/:animieId").post(authenticate, commentController.ReplyComment)
router.route("/like/:commentId").post(authenticate, commentController.toggleLike)
router.route("/unlike/:commentId").post(authenticate, commentController.toggleUnLike)


export {router as AnimieCommentRouter}