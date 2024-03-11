import express from "express"
import { AnimieController } from "../controllers/animie.controller"
import { upload, uploadVideo } from "../utils/upload"

const router= express.Router()
const animieController= new AnimieController()

router.route("/").get(animieController.GetAnimies)
router.route("/upload-animie").post(
    upload.single('video'),
    uploadVideo
)

export {router as AnimieRouter}