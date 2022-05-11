const router = require('express').Router();
const wordControllers = require('../controllers/word.controller');

router.route('/word/:gameId').post(wordControllers.createWord);

module.exports = router;
