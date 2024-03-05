import express from "express"
import { AnimieController } from "../controllers/animie"

const router= express.Router()
const animieController= new AnimieController()

router.route("/").get(animieController.GetAllAnimie)

export {router as AnimieRouter}