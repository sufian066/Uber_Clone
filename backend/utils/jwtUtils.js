const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

/**
 * Generates a JWT token for a given user payload.
 * @param {Object} payload - Data to encode (e.g. { userId, role })
 * @param {string|number} expiresIn - Expiry (e.g. "1d", "2h")
 * @returns {string} JWT token
 */
function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verifies and decodes a JWT token.
 * @param {string} token
 * @returns {Object} Decoded payload
 * @throws {Error} if invalid
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken
};
