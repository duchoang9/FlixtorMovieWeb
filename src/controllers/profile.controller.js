const db = require('../models');
const bcrypt = require('bcryptjs');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const userId = req.user.id;

    // Kiểm tra nếu user tồn tại
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra nếu username tồn tại
    if (username !== user.user_name) {
      const existingUser = await db.User.findOne({ where: { user_name: username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Kiểm tra nếu email tồn tại
    if (email !== user.email) {
      const existingEmail = await db.User.findOne({ where: { email: email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already taken' });
      }
    }

    // Kiểm tra password trùng khớp
    if (password && confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user profile
    await db.User.update(
      {
        user_name: username,
        email: email,
        password: hashedPassword,
        update_at: new Date(),
      },
      { where: { id: userId } }
    );

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};