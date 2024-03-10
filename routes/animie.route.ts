import express from "express"
import { AnimieController } from "../controllers/animie.controller"

const router= express.Router()
const animieController= new AnimieController()

router.route("/").get(animieController.GetAnimies)

export {router as AnimieRouter}