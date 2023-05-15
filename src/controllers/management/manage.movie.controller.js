const { Op, where } = require("sequelize");
const models = require("../../models/index");
const User = models.user;
const Movie = models.movie;
const Actor = models.actor;
const Cast = models.cast;
const Director = models.director;
const Producer = models.producer;
const Gerne = models.gerne;
const Category = models.category;
const Sequelize = models.sequelize;

module.exports.showMovies = async (req, res) => {
  const admin = await User.findByPk(req.userId, {
    attributes: ["id", "user_name", "email", "password", "role"],
  });

  const movieList = await Movie.findAll({
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
      {
        model: Actor,
        attributes: ["full_name"],
      },
      {
        model: Gerne,
        attributes: ["name"],
      },
    ],
    distinct: true,
  });

  // movieList.forEach((movie) => {
  //   // console.log(movie);
  //   console.log(movie.id);
  //   console.log(movie.title);
  //   console.log(movie.description);
  //   console.log(movie.rating);
  //   console.log(movie.duration);
  //   console.log(movie.actors.map((actor) => actor.full_name));
  //   console.log(movie.gernes.map((gerne) => gerne.name));
  //   console.log(movie.director.full_name);
  //   console.log(movie.producer.name);
  // });
  res.render("management/manage_movie", {
    title: "Manage Movies",
    movieList,
    admin,
  });
};

module.exports.postDeleteMovie = async (req, res) => {
  try {
    const deleteIds = req.body.deleteIds;
    await Movie.destroy({
      where: {
        id: {
          [Op.in]: deleteIds,
        },
      },
    });

    res.status(200).json({ message: "Deleted." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.postUpdateMovie = async (req, res) => {
  try {
    const temp = req.body.updateTitle.toLowerCase().split(" ");
    for (let i = 0; i < temp.length; i++) {
      temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1).toLowerCase();
    }
    const titleMoive = temp.join(" ");
    await Movie.update(
      {
        title: titleMoive,
        description: req.body.updateDescription,
        rating: req.body.updateRating,
        duartion: req.body.UpdateDuartion,
        release: req.body.updateRelease,
        update_at: Sequelize.literal("NOW()"),
      },
      {
        where: {
          id: req.body.updateId,
        },
      }
    );

    res.status(200).json({ message: "Success." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.postAddMovie = async (req, res) => {
  try {
    // ACTOR
    const actorIds = [];
    try {
      const actors = req.body.actorList.split(", ");
      for (const actorInput of actors) {
        //format input
        const words = actorInput.toLowerCase().split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] =
            words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
        }
        const actorName = words.join(" ");
        //find or create
        const [actor, created] = await Actor.findOrCreate({
          where: { full_name: actorName },
          defaults: {},
        });
        actorIds.push(actor.id);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create actors");
    }

    // GERNE
    const gerneIds = [];
    try {
      const gernes = req.body.gerneList.split(", ");
      for (const genreInput of gernes) {
        // format input
        //format input
        const words = genreInput.toLowerCase().split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] =
            words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
        }
        const genreName = words.join(" ");
        //find or create
        const [gerne, created] = await Gerne.findOrCreate({
          where: { name: genreName },
          defaults: {},
        });
        gerneIds.push(gerne.id);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create gernes");
    }

    //DIRECTOR
    let directorId = null;
    try {
      //format input
      const words = req.body.director.toLowerCase().split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
      }
      const directorName = words.join(" ");
      //find or create
      const [director, createdDirector] = await Director.findOrCreate({
        where: { full_name: directorName },
        defaults: {},
      });
      directorId = director.id;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create director");
    }

    //PRODUCER
    let produceId = null;
    try {
      //format input
      const text = req.body.producer.toLowerCase().split(" ");
      for (let i = 0; i < text.length; i++) {
        text[i] = text[i][0].toUpperCase() + text[i].slice(1).toLowerCase();
      }
      const producerName = text.join(" ");
      const national = req.body.country.toLowerCase().split(" ");
      for (let i = 0; i < national.length; i++) {
        national[i] =
          national[i][0].toUpperCase() + national[i].slice(1).toLowerCase();
      }
      const countryName = national.join(" ");
      //find or create
      const [producer, createdProducer] = await Producer.findOrCreate({
        where: { name: producerName, country: countryName },
        defaults: {},
      });
      produceId = producer.id;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create producer");
    }

    //MOVIE
    let movieId = null;
    try {
      //format input
      const temp = req.body.title.toLowerCase().split(" ");
      for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1).toLowerCase();
      }
      const titleMoive = temp.join(" ");
      const movie = await Movie.create({
        title: titleMoive,
        description: req.body.description,
        rating: req.body.rating,
        duration: req.body.duration,
        release: req.body.release,
        image: req.files.image ? req.files.image[0].filename : null,
        video: req.files.video ? req.files.video[0].filename : null,
        director_id: directorId,
        producer_id: produceId,
        create_at: Sequelize.literal("NOW()"),
      });
      movieId = movie.id;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create movie");
    }

    // CAST
    try {
      for (const actorId of actorIds) {
        await Cast.create({
          actor_id: actorId,
          movie_id: movieId,
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create cast");
    }

    // CATEGORY
    try {
      for (const gerneId of gerneIds) {
        await Category.create({
          gerne_id: gerneId,
          movie_id: movieId,
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create category");
    }
    const script = `<script>
                      alert('Success');
                      window.location.href='/management/movies';
                    </script>`;

    res.status(200).send(script);
  } catch (error) {
    const script = `<script>
                      alert('${error.message}');
                      window.location.href='/management/movies';
                    </script>`;
    res.status(500).send(script);
  }
};
