const { enhancer } = require('../utils/openai_utils.js');

async function enhance_blog(blogData) {
    try {
        const enhancedContent = await enhancer(blogData);
        return enhancedContent;
    } catch (error) {
        console.error('Error enhancing blog:', error.message);
        throw error;
    }
}

module.exports = { enhance_blog };