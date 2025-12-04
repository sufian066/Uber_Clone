const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
   console.log('Register endpoint triggered');
  try {
    const { name, email, password, role } = req.body;

    const hashed = await hashPassword(password);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    res.json({ success: true });
  } catch (err) {
     console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  console.log('Login endpoint triggered');
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid password' });

    const token = generateToken({ userId: user._id, role: user.role });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
};

