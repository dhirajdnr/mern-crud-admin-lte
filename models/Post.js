const mongoose = require("mongoose");
const { Schema } = mongoose;

const createPost = new Schema({
  title: String,
  body: String,
  subject: String,
  created_at: Date,
  updated_at: Date
});

mongoose.model("post", createPost);
