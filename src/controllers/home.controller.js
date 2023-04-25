const { movie_list, movie, watch_list } = require('../models');
const { Op } = require('sequelize');

// GET /
module.exports.home = async (req, res) => {
  try {
    const hotMovies = await movie.findAll({
      order: [['rating', 'DESC']],
      limit: 8
    });

    const latestMovies = await movie.findAll({
      order: [['create_at', 'DESC']],
      limit: 8
    });

    const movieInWatchList = await movie.findAll({ 
      include: [
          {
              model: watch_list,
              where: {user_id: req.userId}
          }
      ],
      raw: true
    });

    res.render('home', {
      title: 'Home',
      hotMovies,
      latestMovies,
      movieInWatchList
    });

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};


// GET /search
module.exports.search = async (req, res) => {
  const { keyword } = req.query;
  try {
    const results = await movie.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      }
    });
    res.render('home', {
      title: 'Search Results',
      results: results || [] 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};