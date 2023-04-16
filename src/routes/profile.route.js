const express = require('express');
const router = express.Router();

const { requiresLogin, isLoggedIn, editProfileMiddleware, editProfile } = require('../controllers/profile.controller');

router.use(isLoggedIn);
router.use(editProfileMiddleware);
router.post('/editprofile', requiresLogin, editProfile);

module.exports = router;