const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    console.log('1) 🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Stop app if DB fails
  }
};

module.exports = connectDB;
