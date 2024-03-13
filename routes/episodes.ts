import express from "express"
import { upload, uploadImage, uploadMultipleFile, uploadMultipleFiles, uploadSingleImage, uploadVideo } from "../utils/upload"
import { EpisodesController } from "../controllers/episodes.controller"
import { validateRequest } from "../utils/validators"
import { ValidationSchema } from "../utils/global"

const router= express.Router()
const episodeController= new EpisodesController()
const valationSchema= new ValidationSchema()

router.route("/").post(
    uploadMultipleFile,
    uploadMultipleFiles,
    validateRequest(valationSchema.createEpisode()),
    episodeController.CreateEpisode
)

router.route("/anime/:id").get(
    episodeController.GetEpisodes
)

router.route("/:id").get(
    episodeController.GetEpisode
)
router.route("/:id").patch(
    uploadMultipleFile,
    uploadMultipleFiles,
    validateRequest(valationSchema.createEpisode()),
    episodeController.UpdateEpisode
)



export {router as EpisodeRouter}