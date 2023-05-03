const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie/movies.controller');
const topIMDbController = require('../controllers/movie/topIMDb.controller');
const gerneController = require('../controllers/movie/gerne.controller');


router.get('/movies', movieController.getAllMovies);
router.get('/topIMDb', topIMDbController.getAlltopIMDb)
router.get('/genre/:genre', gerneController.getAllMoviesByGenre)
router.get('/filter', movieController.filterMovies);
router.get('/search', movieController.search);


module.exports = router;