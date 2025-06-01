const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const { createBlog, GetBlogs, GetBlogById, DeleteBlog } = require('../controllers/blogs'); // Assuming SaveBlog is a function that saves the blog to the database
const e = require('express');

const router = express.Router();

// Creating Blog by user

router.post("/create-blog", authMiddleware, async (req, res) => {
  const { title, description, content, image_url } = req.body;
  const subId = req.user.subId; // extracted from token

  if ((!title || !content || !description) && !image_url) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const data = {
      subId,
      title,
      description,
      content
    };

    if (image_url) {
        data.image_url = image_url; // Include image URL if provided
    } else {
        data.image_url = "https://img.freepik.com/premium-vector/blog-icon-flat-fill-set-collection_1223784-21660.jpg?semt=ais_hybrid&w=740";
    }

    const blog = await createBlog(data); // Assuming SaveBlog is a function that saves the blog to the database

    res.status(201).json({
      Status: 'Success',
      message: 'Blog created successfully',
      Data: blog
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error creating blog', 
      error: err.message 
    });
  }
});

// Get all blogs by user
router.get("/get-blogs", authMiddleware, async (req, res) => {
  const subId = req.user.subId; // extracted from token

  try {
    const blogs = await GetBlogs(subId); // Assuming GetBlogs is a function that retrieves blogs by subId
    res.status(200).json({
      Status: 'Success',
      message: 'Blogs retrieved successfully',
      Data: blogs
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error retrieving blogs', 
      error: err.message 
    });
  }
});

// Get blog by blogId
router.get("/get-blog/:blogId", authMiddleware, async (req, res) => {
  const { blogId } = req.params;
  console.log(`Fetching blog with ID: ${blogId}`);
  const subId = req.user.subId; // extracted from token

  try {
    const blog = await GetBlogById(subId, blogId); // Assuming GetBlogs is a function that retrieve
    res.status(200).json({
      Status: 'Success',
      message: 'Blog retrieved successfully',
      Data: blog
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error retrieving blog', 
      error: err.message 
    });
  }
});

// Delete blog by blogId
router.delete("/delete-blog", authMiddleware, async (req, res) => {
  const blogId  = req.body;
  const subId = req.user.subId; // extracted from token

  try {
    // Assuming DeleteBlog is a function that deletes the blog by subId and blogId
    const deletedBlog = await DeleteBlog(subId, blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
      Status: 'Success',
      message: 'Blog deleted successfully',
      Data: deletedBlog
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error deleting blog', 
      error: err.message 
    });
  }
});

module.exports = router;
