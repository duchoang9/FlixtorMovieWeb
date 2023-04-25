const express = require('express');
const router = express.Router();

const controller = require('../controllers/home.controller');
const { verifyToken, isUser } = require('../middlewares/authJwt');

router.get('/', [verifyToken, isUser], controller.home);
router.get('/search', controller.search);

module.exports = router;