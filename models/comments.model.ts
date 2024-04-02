import mongoose, {Types, ObjectId, Document, Schema } from "mongoose";

//Animie Comment schema
export interface IAnimieComment extends Document {
  userId: Types.ObjectId;
  animieId: Types.ObjectId;
  message: string;
}

const animieCommentSchema = new Schema<IAnimieComment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  animieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animie"
}, 
  message: {
    type: String,
    required:[true, "Comment must not be empty!"],
  },
});

const AnimieComment = mongoose.model("AnimieComment", animieCommentSchema);



//Episode Comment schema
export interface IEpisodeComment extends Document {
  userId: Types.ObjectId;
  episodeId: Types.ObjectId;
  message: string;
}

const episodeCommentSchema = new Schema<IEpisodeComment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  episodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode"
}, 
  message: {
    type: String,
    required:[true, "Comment must not be empty!"],
  },
});

const EpisodeComment = mongoose.model("EpisodeComment", episodeCommentSchema);

export {AnimieComment,EpisodeComment };