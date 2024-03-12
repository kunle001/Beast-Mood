import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// an interface that describes the properties that are required to create a new user. 

interface EpisodeAttrs {
    title: string;
    description: string;
    image: string;
    views: string
    url: string
    animie: string
};

interface EpisodeDocs extends mongoose.Document {
    title: string;
    description: number;
    image: string;
    views: string;
    url: string;
    animie: string
};

interface EpisodeModel extends mongoose.Model<EpisodeDocs> {
    build(attrs: EpisodeAttrs): EpisodeDocs;
};

const EpisodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'your Episode should have a title']
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    animie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animie"
    }, 
    episode_number: {
        type: Number,
        required: [true, 'you must parse episode number']
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
            virtuals: true,
            
        },
        toObject:{virtuals:true}
});



EpisodeSchema.set('versionKey', 'version')
EpisodeSchema.plugin(updateIfCurrentPlugin);

EpisodeSchema.pre('save', function (done) {
    this.increment()
    done();
});

EpisodeSchema.statics.build = (attrs: EpisodeAttrs) => {
    return new Episode(attrs)
};

const Episode = mongoose.model<EpisodeDocs, EpisodeModel>('Episode', EpisodeSchema)

export { Episode }