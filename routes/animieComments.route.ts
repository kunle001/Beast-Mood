import express from "express"
import { CommentController } from "../controllers/animiecomment.controller"

const router= express.Router()
const commentController= new CommentController()

router.route("/createComment").post(commentController.Create)
router.route("/getAllComment").get(commentController.GetComments)
router.route("/:id/getOneComment").get(commentController.GetOneAnimieComment)
router.route("/:id/updateComment").put(commentController.UpdateComment)
router.route("/:id/deleteComment").delete(commentController.DeleteComment)



export {router as AnimieCommentRouter}