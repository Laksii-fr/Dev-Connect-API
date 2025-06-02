const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');

const { modifyBlog } = require('../controllers/smart_blog');

const router = express.Router();

router.post('/modify-blog', authMiddleware, async (req, res) => {
    const { title, content, description } = req.body;

    if ((!title || !content ) && !description) {
        return res.status(400).json({ message: 'Title, content are required to enhance the blog' });
    }
    data = {
        title,
        content
    }
    if (description) { data.description = description; } else { data.description = "None" };
    try {
        console.log(`Enhancing blog with title: ${title}`);
        const blog = await modifyBlog(data);
        res.status(200).json({
            Status: 'Success',
            message: 'Blog modified successfully',
            Data: blog
        });
    } catch (err) {
        res.status(500).json({
            Status: 'Error',
            message: 'Error modifying blog',
            error: err.message
        });
    }
});

module.exports = router;