const User = require('../models/User');

const addUser = async (req, res, next) => {
  try {
    const newuser = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        user: newuser,
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: 'applications',
      select: 'post score status',
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
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

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.Id;
    const user = await User.findById(userId).populate({
      path: 'applications',
      select: 'post score status',
    });

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'user does not exist',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          user,
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

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.Id;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'user does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
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

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.Id;
    await User.findByIdAndRemove(userId);

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
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
