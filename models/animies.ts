import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// an interface that describes the properties that are required to create a new user. 

interface AnimieAttrs {
  title: string;
  description:string;
  image : string;
};

interface AnimieDocs extends mongoose.Document {
  title: string;
  description: number;
  image: string;
};

interface AnimieModel extends mongoose.Model<AnimieDocs> {
  build(attrs: AnimieAttrs): AnimieDocs;
};

const AnimieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'your Animie should have a title']
  },
  description: {
    type: String
  },
  image:{
    type: String,
    required: [true, "Your Animie should have an image"]
  }

},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  });
AnimieSchema.set('versionKey', 'version')
AnimieSchema.plugin(updateIfCurrentPlugin);

AnimieSchema.pre('save', function (done) {
  this.increment()
  done();
});

AnimieSchema.statics.build = (attrs: AnimieAttrs) => {
  return new Animie(attrs)
};
const Animie = mongoose.model<AnimieDocs, AnimieModel>('Animie', AnimieSchema)

export { Animie }