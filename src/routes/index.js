const homeRouter = require("./home.route");
const accountRouter = require("./account.route");
const managementRouter = require("./management.route");
const movieRouter = require('./movie.route')

function routes(app) {
  app.use("/", homeRouter);
  app.use("/account", accountRouter);
  app.use("/management", managementRouter);
  app.use('/movie', movieRouter);
}

module.exports = routes;
