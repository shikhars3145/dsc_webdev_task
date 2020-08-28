const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, req, res) => {
  const token = signToken(user._id);

  //   console.log('res', res);
  res.cookie('jwt', token, {
    httpOnly: true,
  });

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      batch: req.body.batch,
      year: req.body.year,
      technologies: req.body.technologies,
      github: req.body.github,
      linkedin: req.body.linkedin,
    });

    createSendToken(newUser, req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'an error occured',
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // console.log('not sent');
      return res.status(500).json({
        status: 'fail',
        message: 'email or password not sent',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
      // console.log('not matched');
      return res.status(500).json({
        status: 'fail',
        message: 'email or password incorrect',
      });
    }

    createSendToken(user, req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'an error occured',
    });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(500).json({
        status: 'fail',
        message: 'not logged in',
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(500).json({
        status: 'fail',
        message: 'account has been deleted',
      });
    }

    req.user = currentUser;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'an error occured',
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(500).json({
        status: 'fail',
        message: 'not allowed to use this route',
      });
    }
    next();
  };
};

const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
      return res.status(500).json({
        status: 'fail',
        message: 'wrong password',
      });
    }

    user.password = req.body.password;
    await user.save();

    createSendToken(user, 200, req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'an error occured',
    });
  }
};

module.exports = {
  signup,
  login,
  restrictTo,
  changePassword,
  protect,
};
