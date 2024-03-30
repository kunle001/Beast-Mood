import express from "express"
import { CommentController } from "../controllers/episodeComment.controller"
import { authenticate } from "../utils/auth"
const router= express.Router()
const commentController= new CommentController()



router.route("/createComment/:episodeId").post(authenticate,commentController.Create)
router.route("/getComments").get(commentController.GetComments)
router.route("/editComment/:id").put(commentController.UpdateComment)
router.route("/deleteComment/:id").delete(commentController.DeleteComment)



export {router as EpisodeCommentRouter}