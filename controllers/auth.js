const { User } = require('../models/auth_models');
const { SaveUser } = require('../utils/mongo_utils');
const { checkUserCredentials, get_subid_by_username  } = require('../utils/mongo_utils');
const { generate_subId } = require('../helpers/general_helper');
const { generateToken } = require('../utils/jwt_utils'); // Assuming you have a token helper for generating tokens


async function signup(user) {
  try {
    // Generate Sub id
    user.subId = generate_subId();
    console.log(`Generated subId: ${user.subId}`);
    await SaveUser(user);
    console.log(`User ${user.username} registered successfully.`);
  } catch (error) {
    console.error('Error during signup:', error.message);
    throw error;
  }
}

async function login(user) {
  try {
    await checkUserCredentials(user);
    if(checkUserCredentials) {
      console.log(`User ${user.username} logged in successfully.`);
    }
    const subId = await get_subid_by_username(user.username);
    const token = generateToken({ username: user.username, subId: subId });
    console.log(`Generated token for user ${user.username}: ${token}`);
    return {
      "Username": user.username,
      "subId": user.subId,
      "token": token
    }; // Return the generated token
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
}

module.exports = {
  signup,
  login
};