const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie/movies.controller');

router.get('/movies', movieController.getAllMovies);
router.get('/filter', movieController.filterMovies);
router.get('/search', movieController.search);

module.exports = router;
