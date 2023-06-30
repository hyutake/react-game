const express = require('express');
const router = express.Router();

const {checkAuthMiddleware} = require('../util/auth')

const gameController = require('../controller/gameController');

router.get('/', gameController.getScores);

// to restrict 'post' & 'patch' to logged in users
router.use(checkAuthMiddleware);

router.post('/', gameController.postScore);

router.patch('/', gameController.patchScore);

module.exports = router;