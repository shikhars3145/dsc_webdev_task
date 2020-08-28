const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
      unique: [
        true,
        'email already registered, try logging in or another email id',
      ],
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
    },
    batch: {
      type: String,
    },
    year: {
      type: Number,
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

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'applications',
//     select: 'post score status',
//   });
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
