import express from "express"
import { CommentController } from "../controllers/episodeComment.controller"

const router= express.Router()
const commentController= new CommentController()

router.route("/createComment").post(commentController.Create)
router.route("/getComments").get(commentController.GetComments)
router.route("/:id/editComment").put(commentController.UpdateComment)
router.route("/:id/deleteComment").delete(commentController.DeleteComment)



export {router as EpisodeCommentRouter}