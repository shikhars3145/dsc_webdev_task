const mongoose = require('mongoose');
const Post = require('./Post');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'posts',
      required: [true, 'An Applicantion must have a post'],
    },
    applicant: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: [true, 'An Application must have an applicant'],
    },
    score: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: 'applied',
      enum: {
        values: ['applied', 'selected', 'rejected'],
        message: "status is either 'applied', 'selected', 'rejected'",
      },
    },
  },
  { timestamps: true }
);

applicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'post',
    select: 'team position description technologies',
  }).populate({
    path: 'applicant',
    select: 'name email year technologies',
  });

  next();
});

applicationSchema.statics.calcCount = async function (postId) {
  const countAgg = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: '$post',
        count: { $sum: 1 },
      },
    },
  ]);
  // console.log(countAgg);

  if (countAgg.length > 0) {
    await Post.findByIdAndUpdate(PostId, {
      noOfApplicants: countAgg[0].count,
    });
  } else {
    await Post.findByIdAndUpdate(PostId, {
      noOfApplicants: 0,
    });
  }
};

applicationSchema.post('save', function () {
  this.constructor.calcCount(this.post);
});

applicationSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

applicationSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcCount(this.r.post);
});

const Application = mongoose.model('applications', applicationSchema);

module.exports = Application;
