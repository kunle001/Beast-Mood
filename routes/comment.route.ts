import express from "express"
import { CommentController } from "../controllers/comment.controller"

const router= express.Router()
const commentController= new CommentController()

router.route("/").post(commentController.Create)
router.route("/").get(commentController.GetComments)
router.route("/:id").put(commentController.UpdateComment)
router.route("/:id").delete(commentController.DeleteComment)



export {router as CommentRouter}