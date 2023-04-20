const express = require('express');
const router = express.Router();

const authController = require('../controllers/account/auth.controller');
const userController = require('../controllers/account/user.controller');
const verifySignUp = require('../middlewares/verifySignUp');
const { verifyToken, isAdmin, isUser } = require('../middlewares/authJwt');

router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/signup', verifySignUp, authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);

router.get('/profile/:id', verifyToken, userController.profile);
router.get('/watch_list/:id', [verifyToken, isUser], userController.watchList);
router.post('/profile/:id', userController.postProfile);

module.exports = router;