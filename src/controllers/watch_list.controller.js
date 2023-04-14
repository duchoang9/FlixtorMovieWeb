const db = require('../models');
const WatchList = db.watch_list;

exports.addToWatchList = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    // Kiểm tra phim có tồn tại trong watchlist không
    const existingMovie = await WatchList.findOne({ where: { user_id: userId, movie_id: movieId } });
    if (existingMovie) {
      return res.status(409).json({ message: 'Movie already exists in watchlist' });
    }

    // Thêm phim vào watchlist
    const newMovie = await WatchList.create({ user_id: userId, movie_id: movieId });
    return res.status(201).json({ message: 'Movie added to watchlist', movie: newMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add movie to watchlist' });
  }
};

exports.removeFromWatchList = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    // Tìm phim
    const movie = await WatchList.findOne({ where: { user_id: userId, movie_id: movieId } });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    // Xóa phim ra khỏi watchlist
    await movie.destroy();
    return res.status(200).json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to remove movie from watchlist' });
  }
};