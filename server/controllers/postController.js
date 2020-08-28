const Post = require('./../models/Post');

const addPost = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        post: newPost,
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

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
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

const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.Id;
    const post = await Post.findById(postId).populate({
      path: 'applications',
    });

    if (!post) {
      res.status(404).json({
        status: 'fail',
        message: 'post does not exist',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          post,
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

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.Id;
    const post = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      res.status(404).json({
        status: 'fail',
        message: 'post does not exist',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        post,
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

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.Id;
    await Post.findByIdAndRemove(postId);

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
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
