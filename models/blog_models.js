const mongoose = require('mongoose');

// Define schema
const blogSchema = new mongoose.Schema({
  subId: { type: String, required: true, unique: true, trim: true },
  blogId: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  image_url: { type: String, required: false },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = { Blog };