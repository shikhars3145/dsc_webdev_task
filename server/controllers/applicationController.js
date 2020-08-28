const Application = require('./../models/Application');

const addApplication = async (req, res, next) => {
  try {
    const newApplication = await Application.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        application: newApplication,
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

const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate({
        path: 'post',
        select: 'team position description technologies',
      })
      .populate({
        path: 'applicant',
        select: 'name email year technologies',
      });

    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: {
        applications,
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

const getApplicationById = async (req, res, next) => {
  try {
    const applicationId = req.params.Id;
    const application = await Application.findById(applicationId)
      .populate({
        path: 'post',
        select: 'team position description technologies',
      })
      .populate({
        path: 'applicant',
        select: 'name email year technologies',
      });

    if (!application) {
      res.status(404).json({
        status: 'fail',
        message: 'application does not exist',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          application,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred',
    });
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const applicationId = req.params.Id;
    const application = await Application.findByIdAndUpdate(
      applicationId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      res.status(404).json({
        status: 'fail',
        message: 'application does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        application,
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

const deleteApplication = async (req, res, next) => {
  try {
    const applicationId = req.params.Id;
    await Application.findByIdAndRemove(applicationId);

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
  addApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
