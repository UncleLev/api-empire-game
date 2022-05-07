const router = require('express').Router();

router
	.route('/game/')
	.post()
	.get();

router
	.route('/game/:gameId')
	.post()
	.get()
	.update()
	.delete();

module.exports = router;
