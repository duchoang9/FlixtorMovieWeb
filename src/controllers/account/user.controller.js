const models = require("../../models/index");
const User = models.user;
const Movie = models.movie;
const MovieList = models.movie_list;
const WatchList = models.watch_list;
const Director = models.director;
const Producer = models.producer;
const Sequelize = models.sequelize;

const bcrypt = require("bcryptjs");

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// Public content

// GET signIn
module.exports.signIn = (req, res) => {
  res.render("account/signin", { title: "Sign In" });
};
// GET signUp
module.exports.signUp = (req, res) => {
  res.render("account/signup", { title: "Sign Up" });
};

// Protected content

// GET profile
module.exports.profile = async (req, res) => {
  const user = await User.findByPk(req.userId, {
    attributes: ["id", "user_name", "email", "password", "role"],
  });
  const verified = true;

  if (user === null) {
    console.log("Not found!");
  } else {
    res.render("account/profile", { title: "Profile", user, verified });
  }
};
// POST profile
module.exports.postProfile = async (req, res) => {
  try {
    await User.update(
      {
        user_name: req.body.username,
        email: req.body.email,
        password:
          req.body.newpassword === ""
            ? req.body.password
            : bcrypt.hashSync(req.body.newpassword, 8),
      },
      {
        where: { id: req.body.id },
      }
    );

    return res.status(200).json({
      message: "Profile Changed.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};
// GET Watch List
module.exports.watchList = async (req, res) => {
  const movieInWatchList = await Movie.findAll({
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
  // movieInWatchList.forEach(movie => {
  //     console.log(movie);
  //     console.log(movie['producer.name']);
  // });
  res.render("account/watch_list", {
    title: "Watch List",
    movieInWatchList,
    user,
    verified,
  });
};
