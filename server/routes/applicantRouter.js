const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router
  .route('/')
  .get(applicantController.getAllApplicants)
  .post(applicantController.addApplicant);

router
  .route('/:Id')
  .get(applicantController.getApplicantById)
  .patch(applicantController.updateApplicant)
  .delete(applicantController.deleteApplicant);

module.exports = router;
