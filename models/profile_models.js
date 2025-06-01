const mongoose = require('mongoose');

const CreateProfile = new mongoose.Schema({
    subId: { type: String, required: true, unique: true },
    name : { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    Phone: { type: Number, required: true },
}, { timestamps: true });

const Profile = mongoose.model('Profile', CreateProfile);
module.exports = { Profile };