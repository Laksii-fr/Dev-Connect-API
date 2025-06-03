const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database'); // adjust path if needed


const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
console.log('2) Initializing routes...');
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);
const blogRoutes = require('./routes/blogs');
app.use('/api/blogs', blogRoutes);
const smartBlogRoutes = require('./routes/smart_blog');
app.use('/api/smart-blog', smartBlogRoutes);
const blogOperationsRoutes = require('./routes/blog_operations');
app.use('/api/blog-operations', blogOperationsRoutes);
console.log('3) Routes initialized');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`4) Server running on port ${PORT}`));