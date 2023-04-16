const express = require('express');
const router = express.Router();
const watchListController = require('../controllers/watch_list.controller');

router.use('/watch_list', requireUser);
router.get('/watch_list', watchListController.getWatchList);
router.post('/watch_list/add/:id', requireUser, watchListController.addToWatchList);
router.post('/watch_list/remove/:id', requireUser, watchListController.removeFromWatchList);

module.exports = router;