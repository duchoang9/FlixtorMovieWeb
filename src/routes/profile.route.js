const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

router.put('/edit', profileController.updateProfile);

module.exports = router;