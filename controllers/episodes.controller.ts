import { Request, Response } from "express";
import {catchAsync} from "../utils/catchAsync";
import { Episode } from "../models/episodes.model.";
import AppError from "../utils/appError";
import { sendSuccess } from "../utils/response";




export class EpisodesController{
    public CreateEpisode= catchAsync(async(req:Request, res:Response)=>{
        console.log(req.body)
        const episode= Episode.build({
            ...req.body,
        })

        await episode.save()

        sendSuccess(res, 201, episode)
    })

    public UpdateEpisode= catchAsync(async(req:Request, res:Response)=>{
        const episode= await Episode.findByIdAndUpdate(req.params.id, {...req.body})

        sendSuccess(res, 200, episode)
    })

    public DeleteEpisode= catchAsync(async(req:Request, res:Response)=>{
        
    })

    public GetEpisode= catchAsync(async(req:Request, res:Response)=>{
        
    })

    public GetEpisodes= catchAsync(async(req:Request, res:Response)=>{
        
    })
}