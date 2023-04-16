const db = require('../models');
const bcrypt = require('bcrypt');

exports.editProfile = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id;

    // Thông thông tin user từ db
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra password đã nhập có khớp với password đã lưu không
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Nếu người dùng đã nhập mật khẩu mới, xác thực và cập nhật mật khẩu của người dùng.
    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'New password and confirmation do not match' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update user's password lên database
      await db.User.update({ password: hashedPassword }, { where: { id: userId } });
    }

    // Render trang edit profile và truyền thông tin người dùng
    res.render('editprofile', {
      user: {
        id: user.id,
        username: user.user_name,
        email: user.email,
      },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
};

exports.isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    db.User.findOne({ where: { id: req.session.userId } }).then(user => {
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.userId = user.id;
        res.locals.user = user;
      }
      // Hoàn tất xử lý middleware và chạy đường dẫn.
      next();
    });
  } else {
    next();
  }
};

// Middleware for editprofile route
exports.editProfileMiddleware = (req, res, next) => {
  // Check người dùng có đăng nhập không
  if (!req.user) {
    return res.redirect('/login');
  }

  // Check đường dẫn yêu cầu có đúng không
  if (req.path !== '/editprofile') {
    return next();
  }

  // Render trang edit profile
  res.render('editprofile', {
    user: {
      id: req.user.id,
      username: req.user.user_name,
      email: req.user.email,
    },
    message: '',
  });
};
