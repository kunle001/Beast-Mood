import mongoose, { Types, ObjectId, Document, Schema } from "mongoose";

//Animie Comment schema
export interface IAnimieComment extends Document {
  userId: Types.ObjectId;
  animieId: Types.ObjectId;
  message: string;
}

// Anime Comment schema
export interface IAnimeComment extends Document {
  userId: mongoose.Types.ObjectId;
  animeId: mongoose.Types.ObjectId;
  message: string;
}

const animeCommentSchema = new Schema<IAnimeComment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    animeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
    },
    message: {
      type: String,
      required: [true, "Comment must not be empty!"],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

// Middleware to populate the user data before find operation
animeCommentSchema.pre("find", function (next) {
  this.populate("userId", "-password"); // Assuming password should not be exposed
  next();
});

const AnimieComment = mongoose.model("AnimieComment", animeCommentSchema);

//Episode Comment schema
export interface IEpisodeComment extends Document {
  userId: Types.ObjectId;
  episodeId: Types.ObjectId;
  message: string;
}

const episodeCommentSchema = new Schema<IEpisodeComment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
    },
    message: {
      type: String,
      required: [true, "Comment must not be empty!"],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

episodeCommentSchema.pre("find", function (next) {
  this.populate("userId", "-password"); // Assuming password should not be exposed
  next();
});

const EpisodeComment = mongoose.model("EpisodeComment", episodeCommentSchema);

export { AnimieComment, EpisodeComment };
