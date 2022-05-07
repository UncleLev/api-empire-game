const Game = require('../models/gameModel');
const Word = require('../models/wordModal');
const AppError = require('../utils/appError');
const { ReS } = require('../utils/appResponse');
const catchAsync = require('../utils/catchAsync');

exports.createWord = catchAsync(async (req, res, next) => {
    const { body } = req;
    const data = body;

    const word = await Word.create(data);
    return ReS(res, word);
});

exports.getAllGameWords = catchAsync(async (req, res, next) => {
    const { gameId } = req.params;
    const game = await Game.findById(gameId);

    if (!game) next(new AppError("Can't find game", 404));

    return ReS(res, game);
});
