const router = require('express').Router();
// const gameRoute = require('./game.routes');
const wordRoute = require('./word.routes');

// router.use(gameRoute);
router.use(wordRoute);

module.exports = router;
