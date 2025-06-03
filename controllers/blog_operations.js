const {like_blog, unlike_blog, addComment} = require('../utils/mongo_utils.js');
const { v4: uuidv4 } = require('uuid');

async function likeBlogPost({ blogId, subId }) {
    try {
        await like_blog(blogId, subId);
    } catch (error) {
        throw new Error(`Error liking blog post: ${error.message}`);
    }
}

async function unlikeBlogPost({ blogId, subId }) {
    try {
        await unlike_blog(blogId, subId);
    } catch (error) {
        throw new Error(`Error unliking blog post: ${error.message}`);
    }
}

async function addcomment(data) {
    try {
        if (!data.comment || typeof comment !== 'string') {
            throw new Error('Comment must be a non-empty string');
        }
        const commentId = uuidv4(data.comment); // Generate a unique ID for the comment
        const result = await addComment(data.blogId, data.subId, data.comment, commentId);
        return result;
    } catch (error) {
        throw new Error(`Error adding comment to blog post: ${error.message}`);
    }
}

module.exports = { 
    likeBlogPost, 
    unlikeBlogPost,
    addcomment 
};