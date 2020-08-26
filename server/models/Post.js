const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A post must have a name'],
    },
    description: {
      type: String,
    },
    technologies: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
