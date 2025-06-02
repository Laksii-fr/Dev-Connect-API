const { User } = require('../models/auth_models');
const { Profile } = require('../models/profile_models');
const { Blog } = require('../models/blog_models');
const bcrypt = require('bcrypt');

const SaveUser = async ({ subId, username, password }) => {
  try {
    const newUser = new User({ subId, username, password });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Error saving user: ${error.message}`);
  }
};

const checkUserCredentials = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return false;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    throw new Error(`Error checking credentials: ${error.message}`);
  }
};

const get_subid_by_username = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user.subId;
  } catch (error) {
    throw new Error(`Error retrieving subId: ${error.message}`);
  }
};

// Profile related functions

async function SaveUserProfile({subId, name, email, Phone}) {
  try {
    const newProfile = new Profile({ subId, name, email, Phone });
    const savedProfile = await newProfile.save();
    return savedProfile;
  } catch (error) {
    throw new Error(`Error creating user profile: ${error.message}`);
  }
}

async function GetUserProfile(subId, username) {
  try {
    const profile = await Profile.findOne({ subId, username });
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }
  catch (error) {
    throw new Error(`Error retrieving user profile: ${error.message}`);
  }
}

async function GetUserProfile_by_id(subId) {
  try {
    const profile = await Profile.findOne({ subId });
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }
  catch (error) {
    throw new Error(`Error retrieving user profile: ${error.message}`);
  }
}

async function UpdateUserProfile(subId, updateFields) {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { subId },
      { $set: updateFields },
      { new: true }
    );
    if (!updatedProfile) {
      throw new Error('Profile not found');
    }
    return updatedProfile;
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
}


// Blog related Funcitons

async function SaveBlog(blogData) {
  const { blogId, subId, title, description, content, image_url } = blogData;

  const existing = await Blog.findOne({ blogId });
  if (existing) {
    throw new Error("Blog with this blogId already exists.");
  }

  const newBlog = {
    subId,
    blogId,
    title,
    description,
    content,
    image_url,
    published: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  try {
    const saved = await Blog.create(newBlog);
    return saved;
  } catch (err) {
    console.error("Error saving blog:", err.message);
    throw new Error(`Failed to save blog: ${err.message}`);
  }
}

async function GetBlogs(subId) {
  try {
    const blogs = await Blog.find({ subId }).select('subId title blogId description image_url');
    return blogs;
  } catch (error) {
    throw new Error(`Error retrieving blogs: ${error.message}`);
  }
}

async function GetBlogById(subId, blogId) {
  try {
    console.log(`Retrieving blog with ID: ${blogId} for subId: ${subId}`);
    const blog = await Blog.findOne({ subId, blogId });
    if (!blog) {
      throw new Error('Blog not found');
    }
    console.log(`Blog retrieved: ${blog.title}`);
    return blog;
  }
  catch (error) {
    throw new Error(`Error retrieving blog by ID: ${error.message}`);
  }
}

async function DeleteBlog(subId, blogId) {
  try {
    const deletedBlog = await Blog.findOneAndDelete( subId, blogId );
    if (!deletedBlog) {
      throw new Error('Blog not found or already deleted');
    }
    return deletedBlog;
  }
  catch (error) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
}

module.exports = {
  SaveUserProfile,
  GetUserProfile,
  SaveUser,
  GetUserProfile_by_id,
  checkUserCredentials,
  UpdateUserProfile,
  get_subid_by_username,
  SaveBlog: SaveBlog,
  getBlogs : GetBlogs,
  getBlogById: GetBlogById,
  deleteBlog: DeleteBlog
};