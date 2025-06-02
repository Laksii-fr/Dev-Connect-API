import enhancer from '../utils/openai_utils.js';

async function enhance_blog(blogData) {
    try {
        const enhancedContent = await enhancer(blogData);
        return enhancedContent
    } catch (error) {
        console.error('Error enhancing blog:', error.message);
        throw error; // Propagate the error to be handled by the calling function
    }
}

export { enhance_blog };