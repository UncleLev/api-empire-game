const router = require('express').Router();
const wordControllers = require('../controllers/word.controller');

router.route('/word').post(wordControllers.createWord);

// router.route('/word/:gameId').get(wordControllers.wordControllers);

// router
// 	.route('/word/:wordId')
// 	.post(() => {})
// 	.get(() => {})
// 	.delete(() => {});

module.exports = router;
