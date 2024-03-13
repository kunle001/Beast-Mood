import mongoose, { Document, Model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface EpisodeAttrs {
    title: string;
    description?: string; // Change type to string
    image: string;
    url: string;
    animie: mongoose.Types.ObjectId; 
    episode_number: number
}

interface EpisodeDoc extends Document {
    title: string;
    description?: string; // Change type to string
    image: string;
    views: number; // Change type to string
    url: string;
    animie: mongoose.Types.ObjectId;
    episode_number: number
}

interface EpisodeModel extends Model<EpisodeDoc> {
    build(attrs: EpisodeAttrs): EpisodeDoc;
}

const episodeSchema = new Schema<EpisodeDoc>({
    title: {
        type: String,
        required: [true, 'Your episode should have a title']
    },
    description: String, // Change type to String
    url: String, // Change type to String
    image: String,
    animie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animie'
    }, 
    views: {
        type: Number,
        default: 0,
    },
    episode_number: {
        type: Number,
        required: [true, "episode_number is required"]
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        virtuals: true
    },
    toObject: { virtuals: true }
});

episodeSchema.set('versionKey', 'version');
episodeSchema.plugin(updateIfCurrentPlugin);

episodeSchema.pre('save', function (done) {
    this.increment();
    done();
});

episodeSchema.statics.build = (attrs: EpisodeAttrs) => {
    return new Episode(attrs);
};

const Episode = mongoose.model<EpisodeDoc, EpisodeModel>('Episode', episodeSchema);

export { Episode };
