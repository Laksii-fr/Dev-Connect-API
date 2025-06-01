const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // use .env in real apps
const JWT_EXPIRES_IN = '1h'; // adjust as needed

function generateToken(payload) {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
