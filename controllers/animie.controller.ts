import { Request, Response } from "express";
import cloudinary from "cloudinary";
import { Animie } from "../models/animies.model";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import { Episode } from "../models/episodes.model.";

export class AnimieController {
  public GetAnimies = async (req: Request, res: Response) => {
    try {
      var { page = "1", limit = "50", search_term } = req.query;

      // Convert page and limit to numbers
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      // Ensure valid numbers are used for pagination
      const skip = (pageNumber > 0 ? pageNumber - 1 : 0) * limitNumber;
      let query: any = {};
      if (search_term) {
        const searchRegex = new RegExp(search_term as string, "i");
        query.$or = [
          { title: searchRegex },
          { description: searchRegex },
          { genre: searchRegex },
        ];
      }

      const data = await Animie.find(query).skip(skip).limit(limitNumber);

      sendSuccess(res, 200, data);
    } catch (e: any) {
      throw new AppError(e, 500);
    }
  };

  public GetOneAnimie = catchAsync(async (req: Request, res: Response) => {
    const animie = await Animie.findById(req.params.id).populate([
      "episodes",
      "comments",
    ]);

    if (!animie) {
      throw new AppError("no animie with this name", 404);
    }

    sendSuccess(res, 200, animie);
  });

  public CreateAnimie = catchAsync(async (req: Request, res: Response) => {
    const { title, genre, description, image } = req.body;
    const animie = Animie.build({
      title,
      genre,
      description,
      image,
    });

    await animie.save();

    sendSuccess(res, 201, animie);
  });

  public DeleteAnimie = catchAsync(async (req: Request, res: Response) => {
    const animie = await Animie.findByIdAndDelete(req.params.id);
    if (!animie) {
      throw new AppError("No animie with this id found", 404);
    }
    sendSuccess(res, 201, "animie deleted successfully");
  });

  public UpdateAnimie = catchAsync(async (req: Request, res: Response) => {
    const animie = await Animie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    sendSuccess(res, 201, animie);
  });

  public getTrendingAnimes = catchAsync(async (req: Request, res: Response) => {
    const trendingAnimes = await Episode.aggregate([
      {
        // Group by anime ID and sum all views
        $group: {
          _id: "$animie", // Group by `animie` field, which refers to the anime ID
          totalViews: { $sum: "$views" }, // Sum up the views of all episodes
        },
      },
      {
        // Lookup to get the anime details from the Animie collection
        $lookup: {
          from: "animies", // The collection name for the anime schema (automatically pluralized)
          localField: "_id", // The anime ID from the group stage
          foreignField: "_id", // The _id field in the anime collection
          as: "animeDetails", // The output field for the anime details
        },
      },
      {
        // Unwind the array returned by $lookup
        $unwind: "$animeDetails",
      },
      {
        // Sort by total views in descending order
        $sort: { totalViews: -1 },
      },
      {
        // Optionally limit to top N results (e.g., top 10)
        $limit: 10,
      },
      {
        // Project the fields you want in the output
        $project: {
          title: "$animeDetails.title",
          description: "$animeDetails.description",
          image: "$animeDetails.image",
          genre: "$animeDetails.genre",
          totalViews: 1, // Include the totalViews field
        },
      },
    ]);

    sendSuccess(res, 201, trendingAnimes);
  });
}
