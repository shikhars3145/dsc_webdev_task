const mongoose = require('mongoose');
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
      ref: 'applicants',
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
      required: [true, 'An application must have a status'],
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

const Application = mongoose.model('applicants', applicationSchema);

module.exports = Application;
