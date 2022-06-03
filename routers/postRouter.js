const router = require("express").Router();

const {
  createPost,
  getPost,
  getPosts,
} = require("../controller/postController");

router.post("/create", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);

module.exports = router;
