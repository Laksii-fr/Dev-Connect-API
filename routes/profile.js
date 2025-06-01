const express = require('express');
const { createUserProfile, GetUserProfile, UpdateUserProfile } = require('../controllers/profile');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');


router.post("/create-profile", authMiddleware, async (req, res) => {
  const { email, name, Phone } = req.body;
  const subId = req.user.subId; // extracted from token\

  console.log(`Creating profile for subId: ${subId}, email: ${email}, name: ${name}, phone: ${Phone}`);

  if (!email || !name || !Phone) {
    return res.status(400).json({ message: 'Email, name, and phone are required' });
  }
  try {
    const data = await createUserProfile({ subId, email, name, Phone });
    res.status(200).json({
      Status: 'Success',
      Data: data,
      message: 'User profile created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error creating user profile', 
      error: err.message 
    });
  }
});

router.put("/update-profile", authMiddleware, async (req, res) => {
  const { email, name, Phone } = req.body;
  const subId = req.user.subId; // extracted from token

  console.log(`Updating profile for subId: ${subId}, email: ${email}, name: ${name}, phone: ${Phone}`);

  if (!email && !name && !Phone) {
    return res.status(400).json({ message: 'Atleast One Parameter is Required Phone Name or Email' });
  }
  
  try {
    const updateFields = {};
    if (email) updateFields.email = email;
    if (name) updateFields.name = name;
    if (Phone) updateFields.Phone = Phone;
    const data = await UpdateUserProfile({ subId, updateFields });
    res.status(200).json({
      Status: 'Success',
      Data: data,
      message: 'User profile updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error updating user profile', 
      error: err.message 
    });
  }
});

router.get("/get-profile", authMiddleware, async (req, res) => {
  const subId = req.user.subId; // extracted from token

  console.log(`Retrieving profile for subId: ${subId}`);

  try {
    const data = await GetUserProfile(subId);
    res.status(200).json({
      Status: 'Success',
      Data: data,
      message: 'User profile retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      Status: 'Error',
      message: 'Error retrieving user profile', 
      error: err.message 
    });
  }
});

module.exports = router;