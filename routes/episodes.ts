import express from "express"
import { upload, uploadVideo } from "../utils/upload"
import { EpisodesController } from "../controllers/episodes.controller"
import { validateRequest } from "../utils/validators"
import { ValidationSchema } from "../utils/global"

const router= express.Router()
const episodeController= new EpisodesController()
const valationSchema= new ValidationSchema()

router.route("/").post(
    upload.single('video'),
    uploadVideo,
    validateRequest(valationSchema.createEpisode()),
    episodeController.CreateEpisode
)

router.route("/").patch(
    upload.single('video'),
    uploadVideo,
    // validation,
    validateRequest(valationSchema.createEpisode()),
    episodeController.CreateEpisode
)

export {router as EpisodeRouter}