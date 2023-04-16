const db = require('../models');
const { Op } = require('sequelize');

exports.getWatchList = async (req, res) => {
  try {
    // Lấy thông tin user từ database
    const user = await db.User.findOne({ where: { id: req.user.id } });

    // Lấy danh sách phim trong watchlist của user đó từ database
    const watchList = await db.WatchList.findAll({
      where: { user_id: req.user.id },
      include: 'movie',
      order: [['createdAt', 'DESC']],
    });

    // Kiểm tra nếu không tìm thấy user hoặc không có phim nào trong watchlist thì trả về lỗi
    if (!user || !watchList) {
      return res.status(404).json({ message: 'User or watchlist not found' });
    }

    // Render view và truyền các thông tin cần hiển thị
    res.render('watch_list', {
      user: {
        username: user.user_name,
        email: user.email,
        numMovies: watchList.length
      },
      watchList
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
    const watchListItem = await db.WatchList.findOne({
      where: {
        user_id: req.session.userId,
        movie_id: movieId
      }
    });

    if (watchListItem) {
      res.status(400).send('Movie already in watch list');
    } else {
      await db.WatchList.create({
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

    await db.WatchList.destroy({
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
// Middleware user
exports.requireUser = async (req, res, next) => {
  // Kiểm tra nếu user chưa đăng nhập thì redirect về trang đăng nhập
  if (!req.user) {
    return res.redirect('/login');
  }
  
  next();
};