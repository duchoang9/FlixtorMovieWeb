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
        order: [['release', 'DESC']],
        limit: 8
      });
  
      let watch_list = null;
      if (req.user) {
        watch_list = await watch_list.findOne({
          where: { user_id: req.user.id },
          include: [{
            model: movie_list,
            include: [{ model: movie }]
          }]
        });
      }
  
      res.render('home', {
        title: 'Home',
        hotMovies,
        latestMovies,
        watch_list
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