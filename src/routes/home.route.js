const express = require("express");
const router = express.Router();

const controller = require("../controllers/home.controller");
const { verifyToken } = require("../middlewares/authJwt");

router.get("/", controller.guest);
router.get("/home", verifyToken, controller.home);

module.exports = router;
