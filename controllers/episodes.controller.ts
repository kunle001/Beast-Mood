import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Episode } from "../models/episodes.model.";
import AppError from "../utils/appError";
import { sendSuccess } from "../utils/response";
import { Animie } from "../models/animies.model";

export class EpisodesController {
  public CreateEpisode = catchAsync(async (req: Request, res: Response) => {
    const { image, url, episode_number, title, description, animie, season } =
      req.body;

    const episode = Episode.build({
      image,
      url,
      episode_number,
      title,
      description,
      animie,
      season,
    });

    await episode.save();

    sendSuccess(res, 201, episode);
  });

  public UpdateEpisode = catchAsync(async (req: Request, res: Response) => {
    const episode = await Episode.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    sendSuccess(res, 200, episode);
  });

  public DeleteEpisode = catchAsync(async (req: Request, res: Response) => {
    const episode = await Episode.findByIdAndDelete(req.params.id);

    sendSuccess(res, 200, "deleted succesfully");
  });

  public GetEpisode = catchAsync(async (req: Request, res: Response) => {
    const episode = await Episode.findById(req.params.id).populate("comments");

    if (!episode) {
      throw new AppError("could not find episode with this id", 400);
    }
    episode.set({
      views: episode.views + 1,
    });
    await episode.save();
    sendSuccess(res, 200, episode);
  });

  public GetEpisodes = catchAsync(async (req: Request, res: Response) => {
    const animie_episodes = await Episode.find({
      animie: req.params.id,
    }).populate("comments");
    sendSuccess(res, 200, animie_episodes);
  });

  public UploadVideo = catchAsync(async (req: Request, res: Response) => {
    sendSuccess(res, 200, {
      url: req.body.url,
    });
  });
}
