import express from "express";
import { AnimieController } from "../controllers/animie.controller";
import {
  upload,
  uploadImage,
  uploadSingleImage,
  uploadVideo,
} from "../utils/upload";
import { ValidationSchema } from "../utils/global";
import { validateRequest } from "../utils/validators";

const router = express.Router();
const animieController = new AnimieController();
const validator = new ValidationSchema();

router.route("/").get(animieController.GetAnimies);
router.route("/trending").get(animieController.getTrendingAnimes);
router
  .route("/create")
  .post(
    uploadSingleImage.single("image"),
    uploadImage,
    validateRequest(validator.createAnimie()),
    animieController.CreateAnimie
  );

router
  .route("/:id")
  .patch(
    uploadSingleImage.single("image"),
    uploadImage,
    validateRequest(validator.updateAnime()),
    animieController.UpdateAnimie
  );

router.route("/:id").get(animieController.GetOneAnimie);

router.route("/:id").delete(animieController.DeleteAnimie);

router.route("/").get(animieController.GetAnimies);

export { router as AnimieRouter };
