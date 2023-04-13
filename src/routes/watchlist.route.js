const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watch_list.controller');
const { check } = require('express-validator');

const WatchList = require('../models/watchlist');

// Thêm bộ phim vào danh sách xem của người dùng
router.post(
    '/watchlist/add',
    [
      // Kiểm tra đầu vào
      check('userId').isInt(),
      check('movieId').isInt(),
    ],
    watchlistController.addMovieToWatchList
  );
  
  // Xoá bộ phim khỏi danh sách xem của người dùng
  router.post(
    '/watchlist/remove',
    [
      // Kiểm tra đầu vào
      check('userId').isInt(),
      check('movieId').isInt(),
    ],
    watchlistController.removeMovieFromWatchList
  );
  
  module.exports = router;

  const watchlistRoutes = require('./routes/watchlist');

// Sử dụng route để các endpoint có thể được gọi
app.use('/', watchlistRoutes);