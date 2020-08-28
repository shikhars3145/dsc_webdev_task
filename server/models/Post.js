const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    team: {
      type: String,
      required: [true, 'A post must have a team'],
    },
    position: {
      type: String,
      required: [true, 'A post must have a position'],
    },
    description: {
      type: String,
      required: [true, 'A post must have a Description'],
    },
    technologies: [String],
    openPositions: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: 'default',
    },
    noOfApplicants: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('applications', {
  ref: 'applications',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
