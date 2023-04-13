const db = require('../models');
const WatchList = db.watch_list;

exports.addToWatchList = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    // Check if the movie already exists in the user's watchlist
    const existingMovie = await WatchList.findOne({ where: { user_id: userId, movie_id: movieId } });
    if (existingMovie) {
      return res.status(409).json({ message: 'Movie already exists in watchlist' });
    }

    // Add the movie to the user's watchlist
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

    // Find the movie in the user's watchlist
    const movie = await WatchList.findOne({ where: { user_id: userId, movie_id: movieId } });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    // Remove the movie from the user's watchlist
    await movie.destroy();
    return res.status(200).json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to remove movie from watchlist' });
  }
};