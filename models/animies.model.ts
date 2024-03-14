import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// Define available genres as enum
export enum Genre {
  "Cars", 
  "Action",
  "Comedy",
  "Fantasy",
  "Kids",
  "Magic",
  "Josei",
  "Ecchi",
  "Harem",
  "Adventure",
  "Martial Arts"
}

// An interface that describes the properties that are required to create a new animie.
interface AnimieAttrs {
  title: string;
  description: string;
  image: string;
  genre: Genre; // Use the Genre enum
}

// An interface that describes the properties that a animie document has
interface AnimieDoc extends mongoose.Document {
  title: string;
  description: string;
  image: string;
  genre: Genre; // Use the Genre enum
  rating?: number;
  episodes: mongoose.Types.ObjectId[];
}

// An interface that describes the properties that a animie model has
interface AnimieModel extends mongoose.Model<AnimieDoc> {
  build(attrs: AnimieAttrs): AnimieDoc;
}

const AnimieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Your Animie should have a title']
    },
    description: {
      type: String
    },
    image: {
      type: String,
      required: [true, "Your Animie should have an image"]
    },
    rating: {
      type: Number,
      default: 0
    },
    genre: {
      type: String,
      enum: Object.values(Genre), // Use the Genre enum
      required: [true, "Your Animie should have a genre"]
    }, 
  },
  
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
  
);

AnimieSchema.set('versionKey', 'version');
AnimieSchema.plugin(updateIfCurrentPlugin);

AnimieSchema.index({rating: 1})

AnimieSchema.pre('save', function (done) {
  this.increment()
  done();
});

AnimieSchema.virtual("episodes", {
  ref:"Episode",
  foreignField: "animie",
  localField: "_id"
})

AnimieSchema.statics.build = (attrs: AnimieAttrs) => {
  return new Animie(attrs);
};



const Animie = mongoose.model<AnimieDoc, AnimieModel>('Animie', AnimieSchema);

export { Animie };
