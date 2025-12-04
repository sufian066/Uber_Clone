const { verifyToken } = require('../utils/jwtUtils');

module.exports = (req, res, next) => {
  const raw = req.header('Authorization');
  console.log('Auth header:', raw); // add this

  const token = raw?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
