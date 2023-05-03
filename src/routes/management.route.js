const express = require("express");
const router = express.Router();

const authController = require("../controllers/account/auth.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const manageUserController = require("../controllers/management/manage.user.controller");
const manageMovieController = require("../controllers/management/manage.movie.controller");
const manageCommentController = require("../controllers/management/manage.comment.controller");

router.get("/users", [verifyToken, isAdmin], manageUserController.showUsers);
// router.get("/movies", [verifyToken, isAdmin], manageMovieController.showMovies);
// router.get(
//   "/comments",
//   [verifyToken, isAdmin],
//   manageCommentController.showComments
// );
router.post("/users", manageUserController.postManageUsers);
// router.post("/movies", manageMovieController.postManageMovies);
// router.post("/comments", manageCommentController.postManageComments);

module.exports = router;
