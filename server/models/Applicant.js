const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'An Applicant must have a name'],
    },
    notes: {
      type: String,
    },
    technologies: [String],
  },
  { timestamps: true }
);

const Applicant = mongoose.model('Applicant', applicantSchema);

module.export = Applicant;
