const Game = require('../models/gameModel');
const Word = require('../models/wordModal');
const {
    findGame,
    findWord,
    updatePrevEmpire,
    updateEmpire,
    findGameWords,
    GameQuerySelect
} = require('../services/game.service');
const { ReS } = require('../utils/appResponse');
const catchAsync = require('../utils/catchAsync');
const { createInviteCode } = require('../utils/helpers/game.helper');
const { getFieldsBySelect } = require('../utils/utils');

exports.createGame = catchAsync(async (req, res, next) => {
    const { category } = req.body;

    const inviteCode = await createInviteCode();

    const doc = await Game.create({ category, inviteCode });
    const game = getFieldsBySelect(doc.toObject(), GameQuerySelect);

    ReS(res, game, 201);
});

exports.getGameById = catchAsync(async (req, res, next) => {
    const { gameId } = req.params;

    const game = await findGame({ gameId });

    ReS(res, game, 200);
});

exports.getGameByInviteCode = catchAsync(async (req, res, next) => {
    const { inviteCode } = req.params;
    const game = await findGame({ inviteCode });

    ReS(res, game, 200);
});

exports.addWord = catchAsync(async (req, res, next) => {
    const { gameId } = req.params;
    const { value, fake } = req.body;
    const game = await findGame({ gameId });

    const word = await Word.create({ value, fake, game: gameId });
    await game.updateOne({ $push: { words: word._id } });

    ReS(res, word, 200);
});

// word
exports.deleteWord = catchAsync(async (req, res, next) => {
    const { gameId, wordId } = req.params;
    const game = await findGame({ gameId });
    const word = await findWord({ wordId });

    await game.updateOne({ $pull: { words: wordId } });

    if (word.empireId) {
        await updatePrevEmpire(word);
    }

    if (word.subjects) {
        await Word.updateMany({ empireId: null });
    }

    await Word.deleteOne({ _id: wordId });

    const words = await findGameWords(gameId);

    ReS(res, words);
});

exports.updateWord = catchAsync(async (req, res, next) => {
    const { gameId, wordId } = req.params;
    const { value, empireId } = req.body;

    await findGame({ gameId });
    const word = await findWord({ wordId });

    if (value) word.value = value;

    if (word.empireId) {
        await updatePrevEmpire(word);
    }
    if (empireId) {
        await updateEmpire(word, empireId);
    }

    await word.save();

    const words = await findGameWords(gameId);
    ReS(res, words);
});

exports.wordDefeat = catchAsync(async (req, res, next) => {
    const { gameId, wordId } = req.params;
    const { empireId } = req.body;

    await findGame({ gameId });

    const word = await findWord({ wordId });
    await updateEmpire(word, empireId);
    await word.save();

    const words = await findGameWords(gameId);

    ReS(res, words);
});
