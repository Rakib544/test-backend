const Post = require("../models/post");

async function createPost(req, res, next) {
  try {
    const post = new Post({
      title: req.body.title,
      email: req.body.email,
      body: req.body.body,
    });
    await post.save();
    res.status(200).json({ success: true });
    global.io.broadcast.emit(
      "new_post",
      `Some one faced a new problem with postId: ${post._id}`
    );
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

async function getPosts(req, res, next) {
  try {
    const post = await Post.find();
    res.status(200).json({ success: true, post: post });
  } catch (err) {
    res.status(404).json({ success: false });
  }
}

async function getPost(req, res, next) {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.status(200).json({ success: true, post: post });
  } catch (err) {
    res.status(404).json({ success: false });
  }
}

module.exports = { createPost, getPost, getPosts };
