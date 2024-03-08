import express, { Request, Response, response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import catchAsync from './catchAsync';



// Set up multer for file upload
export const upload = multer({ dest: 'uploads/' });

// Define the route for uploading videos

export const uploadVideo = catchAsync(async(req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Upload file to Cloudinary
  cloudinary.uploader.upload(file.path, { resource_type: 'video' })
  .then(async (result) => {
    // Fetch video metadata including duration
    const response = await fetch(result.url, {
      method: 'HEAD',
    });


    const resource = await cloudinary.api.resource(result.public_id, { video: true });

    resource.duration

    if (!response.ok) {
      throw new Error('Failed to fetch video metadata');
    }

    res.json({ 
      video: result.url });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload video' });
  });
});