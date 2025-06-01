const { v4: uuidv4 } = require('uuid');

async function CreateBlogId(title) {
  try {
    // Generate a unique ID for the blog
    const blogId = uuidv4(title);
    console.log(`Blog ID for "${title}" is ${blogId}`);
    return blogId;
  } catch (error) {
    console.error('Error generating blog ID:', error.message);
    throw error;
  }
}
module.exports = {
  CreateBlogId
};