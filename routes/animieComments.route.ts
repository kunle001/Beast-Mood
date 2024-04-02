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



export {router as AnimieCommentRouter}