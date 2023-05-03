const models = require("../models/index");
const User = models.user;
const Movie = models.movie;
const WatchList = models.watch_list;
const Director = models.director;
const Producer = models.producer;
const Sequelize = models.sequelize;

module.exports.home = async (req, res) => {
  const hotMovies = await Movie.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "rating",
      "duration",
      "image",
      "video",
      "release",
    ],
    include: [
      {
        model: Director,
        attributes: ["full_name"],
      },
      {
        model: Producer,
        attributes: ["name", "country"],
      },
    ],
    order: [["rating", "DESC"]],
    limit: 8,
    raw: true,
  });

  const latestUpdate = await Movie.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "rating",
      "duration",
      "image",
      "video",
      "release",
    ],
    include: [
      {
        model: Director,
        attributes: ["full_name"],
      },
      {
        model: Producer,
        attributes: ["name", "country"],
      },
    ],
    order: [["create_at", "DESC"]],
    limit: 8,
  });

  const watchList = await Movie.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "rating",
      "duration",
      "image",
      "video",
      "release",
    ],
    include: [
      {
        model: WatchList,
        attributes: [],
        where: { user_id: req.userId },
      },
      {
        model: Director,
        attributes: ["full_name"],
      },
      {
        model: Producer,
        attributes: ["name", "country"],
      },
    ],
    raw: true,
  });

  const user = await User.findByPk(req.userId, {
    attributes: ["id", "user_name"],
  });

  const verified = true;

  res.render("Home", {
    title: "Home",
    hotMovies,
    latestUpdate,
    watchList,
    user,
    verified,
  });
};

module.exports.guest = async (req, res) => {
  const hotMovies = await Movie.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "rating",
      "duration",
      "image",
      "video",
      "release",
    ],
    include: [
      {
        model: Director,
        attributes: ["full_name"],
      },
      {
        model: Producer,
        attributes: ["name", "country"],
      },
    ],
    order: [["rating", "DESC"]],
    limit: 8,
    raw: true,
  });

  const latestUpdate = await Movie.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "rating",
      "duration",
      "image",
      "video",
      "release",
    ],
    include: [
      {
        model: Director,
        attributes: ["full_name"],
      },
      {
        model: Producer,
        attributes: ["name", "country"],
      },
    ],
    order: [["create_at", "DESC"]],
    limit: 8,
    raw: true,
  });

  const verified = false;

  res.render("Home", {
    title: "Home",
    hotMovies,
    latestUpdate,
    verified,
  });
};
