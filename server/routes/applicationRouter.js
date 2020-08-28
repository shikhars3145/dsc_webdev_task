const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');
const { restrictTo } = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(restrictTo('admin'), applicationController.getAllApplications)
  .post(restrictTo('applicant'), applicationController.addApplication);

router
  .route('/:Id')
  .get(applicationController.getApplicationById)
  .patch(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

module.exports = router;
