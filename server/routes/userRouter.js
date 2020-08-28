const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.route('/').get(userController.getAllUsers).post(userController.addUser);

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.use(authController.protect);

router.patch('/changePassword', authController.changePassword);

const userToParam = (req, res, next) => {
  req.params.Id = req.user.id;
  next();
};

router.get('/currUser', userToParam, userController.getUserById);

router.patch('/updateProfile', userToParam, userController.updateUser);

router.use(authController.restrictTo('admin'));

router
  .route('/:Id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
