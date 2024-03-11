import express, { NextFunction, Request, Response, response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import {catchAsync} from './catchAsync';
import fs from "fs"

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('This is not an image'));
  }
};

const uploadS = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
export const uploadSingleImage= uploadS.single('image');


// Set up multer for file upload
export const upload = multer({ dest: 'uploads/' });



// Define the route for uploading videos

export const uploadVideo = catchAsync(async(req: Request, res: Response, next:NextFunction) => {
  const { file } = req;

  if (!file) {
    return next()
  }

  // Upload file to Cloudinary
  await cloudinary.uploader.upload(file.path, { resource_type: 'video' })
  .then(async (result) => {
    // Fetch video metadata including duration
    // const response = await fetch(result.url, {
    //   method: 'HEAD',
    // });


    // const resource = await cloudinary.api.resource(result.public_id, { video: true });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch video metadata');
    // }
    req.body.url= result.url
  })

  fs.unlinkSync(file.path);
  next()
});


export const uploadImage = catchAsync(async(req: Request, res: Response, next:NextFunction) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Upload file to Cloudinary
  await cloudinary.uploader.upload(file.path, { resource_type: 'image' })
  .then(async (result) => {
    req.body.image= result.url
  })

  fs.unlinkSync(file.path);
  next()
});