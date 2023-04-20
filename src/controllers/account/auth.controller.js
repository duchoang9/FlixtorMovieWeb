const models = require('../../models/index');
const User = models.user;
const watchList = models.watch_list;
const Sequelize = models.sequelize;
const authConfig = require('../../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    // Save User to Database
    try {
      const user = await User.create({
        user_name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'client',
        ban:0,
        create_at: Sequelize.literal('NOW()'),
      });

      const watch_list = await watchList.create({
        user_id: user.id
      });

      res.json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          user_name: req.body.username,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }
  
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).json({
          message: "Invalid Password!"
        });
      }
  
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });
  
      let authority = user.role;
  
      req.session.token = token;
  
      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: authority,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).json({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
};

exports.editProfile = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id;

    // Thông thông tin user từ db
    const user = await db.user.findOne({ where: { id: userId } });
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
      await db.user.update({ password: hashedPassword }, { where: { id: userId } });
    }

    // Render trang edit profile và truyền thông tin người dùng
    res.render('profile', {
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
exports.getWatchList = async (req, res) => {
  try {
    // Lấy thông tin user từ database
    const user = await db.user.findOne({ where: { id: req.user.id } });

    // Lấy danh sách phim trong watchlist của user đó từ database
    const watch_list = await db.watch_list.findAll({
      where: { user_id: req.user.id },
      include: 'movie',
      order: [['createdAt', 'DESC']],
    });

    // Kiểm tra nếu không tìm thấy user hoặc không có phim nào trong watchlist thì trả về lỗi
    if (!user || !watch_list) {
      return res.status(404).json({ message: 'User or watchlist not found' });
    }

    // Render view và truyền các thông tin cần hiển thị
    res.render('watch_list', {
      user: {
        username: user.user_name,
        email: user.email,
        numMovies: watch_list.length
      },
      watch_list
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addToWatchList = async (req, res) => {
  try {
    const movieId = req.body.movieId;

    // Kiểm tra movie có tồn tại trong watch_list hay không
    const watchListItem = await db.watch_list.findOne({
      where: {
        user_id: req.session.userId,
        movie_id: movieId
      }
    });

    if (watchListItem) {
      res.status(400).send('Movie already in watch list');
    } else {
      await db.watch_list.create({
        user_id: req.session.userId,
        movie_id: movieId
      });
      res.send('Movie added to watch list');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.removeFromWatchList = async (req, res) => {
  try {
    const watchListItemId = req.body.watchListItemId;

    await db.watch_list.destroy({
      where: {
        id: watchListItemId,
        user_id: req.session.userId
      }
    });

    res.send('Movie removed from watch list');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};