const Applicant = require('../models/Applicant');

const addApplicant = async (req, res, next) => {
  try {
    const newApplicant = await Applicant.create({
      name: req.body.name,
      notes: req.body.name,
      technologies: req.body.tech,
    });

    res.status(200).json({
      status: 'success',
      data: {
        applicant: newApplicant,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'success',
      message: 'An error occurred',
    });
  }
};

const getAllApplicants = async (req, res, next) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json({
      status: 'success',
      results: applicants.length,
      data: {
        applicants,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred',
    });
  }
};

const getApplicantById = async (req, res, next) => {
  try {
    const applicantId = req.params.Id;
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      res.status(404).json({
        status: 'fail',
        message: 'applicant does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        applicant,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred',
    });
  }
};

const updateApplicant = async (req, res, next) => {
  try {
    const applicantId = req.params.Id;
    const applicant = await Applicant.findByIdAndUpdate(applicantId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!applicant) {
      res.status(404).json({
        status: 'fail',
        message: 'applicant does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        applicant,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'fail',
      message: 'An error occurred',
    });
  }
};

const deleteApplicant = async (req, res, next) => {
  try {
    const applicantId = req.params.Id;
    await Applicant.findByIdAndRemove(applicantId);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'An error occurred',
    });
  }
};

module.exports = {
  addApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
};
