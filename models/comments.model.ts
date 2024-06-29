import mongoose, {Types, ObjectId, Document, Schema } from "mongoose";


//Animie Comment schema
export interface IAnimieComment extends Document {
  userId: Types.ObjectId;
  animieId: Types.ObjectId;
  message: string;
  parentComment:Types.ObjectId;
  replies:Types.ObjectId;
  likes:string[];
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
    type:mongoose.Schema.Types.ObjectId,
    ref:"AnimieComment",
    default:null
  },
  replies: [
    { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AnimieComment' 
    }
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Assuming 'User' is the model name for users
},
 { timestamps: true },
);
// Always populate the userId field
animieCommentSchema.pre("findOne", function( next){
  this.populate({path:"replies",
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
  likes:string[];
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
    type:mongoose.Schema.Types.ObjectId,
    ref:"EpisodeComment",
    default:null
  },
  replies: [{ type:mongoose.Schema.Types.ObjectId, ref: 'EpisodeComment' }],
  likes: [{ type:mongoose.Schema.Types.ObjectId, ref: 'User' }] // Assuming 'User' is the model name for users
},
{ timestamps: true },
);

// Always populate the userId field
episodeCommentSchema.pre("findOne", function( next){
  this.populate({path:"replies",
})
  next()
})



const AnimieComment = mongoose.model("AnimieComment", animieCommentSchema);
const EpisodeComment = mongoose.model("EpisodeComment", episodeCommentSchema);

export {AnimieComment,EpisodeComment};