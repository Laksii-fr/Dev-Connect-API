const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

const { likeBlogPost, unlikeBlogPost, addcomment } = require("../controllers/blog_operations");

// Like Operations on Blog Posts
router.post("/like-post", authMiddleware, async (req, res) => {
    const { blogId } = req.body;
    const subId = req.user.subId; // extracted from token
    
    if (!blogId) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }
    try {
        const data = await likeBlogPost({ blogId, subId });
        res.status(200).json({
            Status: 'Success',
            Data: "None",
            message: 'Blog post liked successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            Status: 'Error',
            message: 'Error liking blog post', 
            error: err.message 
        });
    }
})

// Unlike Operations on Blog Posts
router.post("/unlike-post", authMiddleware, async (req, res) => {
    const { blogId } = req.body;
    const subId = req.user.subId; // extracted from token
    
    if (!blogId) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }
    try {
        const data = await unlikeBlogPost({ blogId, subId });
        res.status(200).json({
            Status: 'Success',
            Data: "None",
            message: 'Blog post unliked successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            Status: 'Error',
            message: 'Error unliking blog post', 
            error: err.message 
        });
    }
})

// Comment Operations on Blog Posts
router.post("/comment-post", authMiddleware, async (req, res) => {
    const { blogId, comment } = req.body;
    const subId = req.user.subId; // extracted from token
    
    if (!blogId || !comment) {
        return res.status(400).json({ message: 'Blog ID and comment are required' });
    }
    
    try {
        // Assuming a function to handle commenting on a blog post
        const data = await addcomment({ blogId, subId, comment });
        res.status(200).json({
            Status: 'Success',
            Data: "None",
            message: 'Comment added successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            Status: 'Error',
            message: 'Error commenting on blog post', 
            error: err.message 
        });
    }
})

router.get("/get-all-comments", authMiddleware, async (req, res) => {  

module.exports = router;