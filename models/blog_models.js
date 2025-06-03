const mongoose = require('mongoose');

// Define schema
const blogSchema = new mongoose.Schema({
  subId: { type: String, required: true, trim: true },
  blogId: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  genre: { type: Array, required: true },
  description: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  image_url: { type: String, required: false },
  published: { type: Boolean, default: false },
  likesCount: { type: Number, default: 0 },
}, { timestamps: true });

const blogLikeSchema = new mongoose.Schema({
  blogId: { type: String, required: true },
  subId: { type: String, required: true },
  comment : { type: String, required: false, trim: true },
}, { timestamps: true });

blogLikeSchema.index({ blogId: 1, subId: 1 }, { unique: true }); // Prevent duplicates

const blogCommentSchema = new mongoose.Schema({
  blogId: { type: String, required: true },
  subId: { type: String, required: true },
  comment : { type: String, required: true, trim: true },
  commentId: { type: String, required: true, trim: true },
}, { timestamps: true });


const BlogLike = mongoose.model('BlogLike', blogLikeSchema);
const Blog = mongoose.model('Blog', blogSchema);
const BlogComment = mongoose.model('BlogComment', blogCommentSchema);

module.exports = { Blog, BlogLike, BlogComment};



