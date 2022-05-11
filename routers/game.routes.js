const router = require('express').Router();
const gameController = require('../controllers/game.controller');

router.route('/game').post(gameController.createGame);

router.get('/game/inviteCode/:inviteCode', gameController.getGameByInviteCode);

router.route('/game/:gameId').get(gameController.getGameById);

// word
router.route('/game/:gameId/word').post(gameController.addWord);

router.put('/game/:gameId/word/:wordId', gameController.updateWord);

router.post('/game/:gameId/word/:wordId/delete', gameController.deleteWord);

router.post('/game/:gameId/word/:wordId/defeat', gameController.wordDefeat);

module.exports = router;
