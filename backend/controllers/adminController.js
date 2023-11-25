const asyncHandler = require('express-async-handler');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const BlogPost = require('../models/blogPost');
const Comment = require('../models/comment');
const User = require('../models/user');

const mongoDB =
  'mongodb+srv://mkoulutas:PISrPqLGt8mgiwRR@cluster0.ighlcln.mongodb.net/?retryWrites=true&w=majority';

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url: mongoDB,
  file: (req, file) => {
    // If it is an image, save to photos bucket
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return {
        bucketName: 'photos',
        filename: `${Date.now()}_${file.originalname}`,
      };
    }
    // Otherwise save to default bucket
    return `${Date.now()}_${file.originalname}`;
  },
});

const upload = multer({ storage });

// Display admin control panel
exports.index = asyncHandler(async (req, res, next) => {
  // Check if user admin
  if (!req.currentUser.isAdmin) {
    res.json({ msg: 'You are not authorized' });
    return;
  }
  // Get  blog post data from database
  const posts = await BlogPost.find({})
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'firstname lastname avatar isAdmin _id' },
    })
    .sort({ date: 1 })
    .exec();

  res.json({ posts });
});

// Add new post on post req.
exports.addNewPost = asyncHandler(async (req, res, next) => {
  if (!req.currentUser.isAdmin) {
    console.log('helooo');
    return res.json({ msg: 'You are not authorized.' });
  }
  const post = new BlogPost({
    title: req.body.title,
    body: req.body.body,
    isPublished: req.body.isPublished,
    image: { data: req.body.image.data },
    comments: [],
  });

  await post.save();
  res.json({ post, msg: 'Post successfully added.' });
});
exports.postDetailGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Display single post detail');
});

// Edit post on post req.
exports.postEditPost = asyncHandler(async (req, res, next) => {
  // Check if user admin
  if (!req.currentUser.isAdmin) {
    res.json({ msg: 'You are not authorized' });
    return;
  }

  // Create new blogpost object
  const post = new BlogPost(req.body);
  await BlogPost.findByIdAndUpdate(req.body._id, post, {});

  res.json({ msg: 'Success on edit', post });
});

// Delete post on post req.
exports.postDeletePost = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // Check if user admin
  if (!req.currentUser.isAdmin) {
    res.json({ msg: 'You are not authorized' });
    return;
  }
  const post = await BlogPost.findById(req.body.id).populate('comments');
  // Extract comment IDs from the populated 'comments' field
  const commentIds = post.comments.map((comment) => comment._id);
  // Delete the comments
  await Comment.deleteMany({ _id: { $in: commentIds } });

  // Delete blog post
  await BlogPost.findByIdAndRemove(req.body.id);

  if (post) {
    // Post deleted
    res.json({ msg: 'Post deleted' });
    return;
  }

  res.json({ msg: 'Post could not found. It may be deleted already.' });
});

// Display all users on get
exports.allUsersGet = asyncHandler(async (req, res, next) => {
  // if user is not admin send warning
  if (!req.currentUser.isAdmin) {
    return res.json({ msg: 'You are not authorized' });
  }

  const users = await User.find()
    .select('firstname lastname isAdmin avatar _id')
    .sort({ firstname: 1 })
    .exec();

  res.json({ users });
});
