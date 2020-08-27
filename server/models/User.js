const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    technologies: [String],
    email: {
      type: String,
      required: [true, 'A user must have an email'],
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
    },
    batch: {
      type: String,
    },
    year: {
      type: String,
    },
    role: {
      type: String,
      default: 'applicant',
      enum: {
        values: ['applicant', 'admin'],
        message: 'status is either applicant or admin',
      },
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    applications: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'applications',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'applications',
    select: 'post score status',
  });
});

const User = mongoose.model('users', userSchema);

module.exports = User;
