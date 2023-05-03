const models = require('../../models/index');
const Movie = models.movie;
const Gerne = models.gerne;
const Category = models.category;
const Producer = models.producer;
const User = models.user;
const { Op } = require('sequelize');

module.exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
    });
  
    res.render('movie/movies', { title: 'All Movies', movies});

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

function getReleaseDateBetween(year) {
  if (!year) {
    return [ '0001-01-01', '9999-12-31' ];
  }
  if (year.endsWith('s')) {
    const startYear = parseInt(year.slice(0, 4));
    const endYear = startYear + 9;
    return [`${startYear}-01-01`, `${endYear}-12-31`];
  }
  return [`${year}-01-01`, `${year}-12-31`];
}

module.exports.filterMovies = async (req, res) => {
  const { year, gerne, country } = req.query;
  const sort = req.query.sort;
  let sortOption = {};

  switch (sort) {
    case 'create_at':
      sortOption = [['create_at', 'DESC']];
      break;
    case 'release':
      sortOption = [['release', 'DESC']];
      break;
    case 'title':
      sortOption = [['title', 'ASC']];
      break;
    case 'rating':
      sortOption = [['rating', 'DESC']];
      break;
    default:
      sortOption = [];
  }

  try {
    const movies = await Movie.findAll({
      where: {
        release: {
          [Op.between]: getReleaseDateBetween(year)
        }
      },
      include: [
        {
          model: Producer,
          where: {
            country: country || { [Op.ne]: null }
          }
        },
        {
          model: Gerne,
          where: {
            name: gerne || { [Op.ne]: null }
          }
        }
      ],
      order: sortOption
    });
    res.render('movie/movies', { title: 'Filtered Movies', movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /search
module.exports.search = async (req, res) => {
  const { keyword } = req.query;
  try {
    const results = await Movie.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      }
    });
    res.render('movie/movies', {
      title: 'Search Results',
      results: results || [] 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
