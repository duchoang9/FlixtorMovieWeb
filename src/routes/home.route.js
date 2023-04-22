const express = require('express');
const router = express.Router();

const controller = require('../controllers/home.controller');

router.get('/', controller.home);
router.get('/search', controller.search);

module.exports = router;