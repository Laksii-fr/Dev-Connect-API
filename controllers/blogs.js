// const { SaveBlog, GetBlogs, GetBlogById, UpdateBlog, DeleteBlog } = require('../utils/mongo_utils');
const { SaveBlog, getBlogs, getBlogById, deleteBlog} = require('../utils/mongo_utils');
const { CreateBlogId } = require('../helpers/blog_helpers');

async function createBlog(blogData) {
  try {
    const blogId = await CreateBlogId(blogData.title);
    console.log(`Generated Blog ID: ${blogId}`);

    // Combine blogId with rest of the blog data
    const completeData = { blogId, ...blogData }; // flattening properly

    const newBlog = await SaveBlog(completeData);
    console.log(`Blog titled "${blogData.title}" created successfully.`);
    return newBlog;
  } catch (error) {
    console.error('Error creating blog:', error.message);
    throw error;
  }
};

async function GetBlogs(subId) {
  try {
    const blogs = await getBlogs(subId);
    return blogs;
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);
    throw error;
  }
}

async function GetBlogById(subId, blogId) {
  try {
    const blog = await getBlogById(subId, blogId);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  } catch (error) {
    console.error('Error retrieving blog by ID:', error.message);
    throw error;
  }
}

async function DeleteBlog(subId, blogId) {
  try {
    const deletedBlog = await deleteBlog(subId, blogId);
    if (!deletedBlog) {
      throw new Error('Blog not found or already deleted');
    }
    return deletedBlog;
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    throw error;
  }
}

module.exports = {
  createBlog,
  GetBlogs,
  GetBlogById,
  DeleteBlog
};