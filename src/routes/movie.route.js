const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie/movies.controller');

router.get('/', movieController.getAllMovies);


module.exports = router;