const { enhance_blog } = require ("../helpers/smartblog_helpers");

async function modifyBlog(blogData) {
    try {
        // Enhance the blog data using the helper function
        const enhancedData = await enhance_blog(blogData);
        console.log(`Enhancing blog with title: ${blogData.title}`)
        
        return enhancedData; // Return the modified blog data
    } catch (error) {
        console.error('Error modifying blog:', error.message);
        throw error; // Propagate the error to be handled by the calling function
    }
}

module.exports = {
    modifyBlog
}