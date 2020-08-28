const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router
  .route('/')
  .get(applicationController.getAllApplications)
  .post(applicationController.addApplication);

router
  .route('/:Id')
  .get(applicationController.getApplicationById)
  .patch(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

module.exports = router;
