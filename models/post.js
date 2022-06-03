const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: String,
    email: String,
    body: String,
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
