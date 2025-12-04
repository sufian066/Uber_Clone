// backend/utils/hashPassword.js

const bcrypt = require('bcryptjs');

/**
 * Hashes a password with bcrypt
 * @param {string} password - plain text password
 * @returns {Promise<string>} hashed password
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain password with a hashed password
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>} true if match, false otherwise
 */
async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword
};
