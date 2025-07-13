// model.js
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const Blog = mongoose.model("Blog", schema);
module.exports = Blog;


//Write missing codes here
