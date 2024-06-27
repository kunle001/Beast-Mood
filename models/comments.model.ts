import mongoose, {Types, ObjectId, Document, Schema } from "mongoose";
import Populate from "../utils/autopopulate"

//Animie Comment schema
export interface IAnimieComment extends Document {
  userId: Types.ObjectId;
  animieId: Types.ObjectId;
  message: string;
  parentComment:Types.ObjectId;
  replies:Types.ObjectId;
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
  parentComment:{
    type:Schema.Types.ObjectId,
    ref:"AnimieComment",
    default:null
  },
  replies: [
    { 
    type: Schema.Types.ObjectId, 
    ref: 'AnimieComment' 
    }
  ],
},
 { timestamps: true },
);
// Always populate the userId field
animieCommentSchema.pre("find", function( next){
  this.populate({path:"replies",
populate:{path:"userId"}
})
  next()
})


//Episode Comment schema
export interface IEpisodeComment extends Document {
  userId: Types.ObjectId;
  episodeId: Types.ObjectId;
  message: string;
  parentComment:Types.ObjectId;
  replies:Types.ObjectId;
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
  parentComment:{
    type:Schema.Types.ObjectId,
    ref:"EpisodeComment",
    default:null
  },
  replies: [{ type: Schema.Types.ObjectId, ref: 'EpisodeComment' }],
},
{ timestamps: true },
);

// Always populate the userId field
episodeCommentSchema.pre("find", function( next){
  this.populate({path:"replies",
  populate:{path:"userId"}
})
  next()
})



const AnimieComment = mongoose.model("AnimieComment", animieCommentSchema);
const EpisodeComment = mongoose.model("EpisodeComment", episodeCommentSchema);

export {AnimieComment,EpisodeComment};