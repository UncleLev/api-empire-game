const Game = require('../models/gameModel');
const Word = require('../models/wordModal');
const AppError = require('../utils/appError');

const GameQuerySelect = 'category inviteCode words _id';
const WordQuerySelect = '-__v';

const findGame = async ({ gameId, inviteCode }) => {
    const gamePromise = gameId ? Game.findById(gameId) : Game.findOne({ inviteCode });

    const game = await gamePromise.populate('words', WordQuerySelect).select(GameQuerySelect);

    if (!game) {
        throw new AppError(`Can't find game with this ${gameId ? 'id' : 'inviteCode'}`, 404);
    }

    return game;
};

const findWord = async ({ wordId }) => {
    const word = await Word.findById(wordId);

    if (!word) {
        throw new AppError(`Can't find word with this  id'`, 404);
    }

    return word;
};

/**
 * @param {doc} word
 */
const updatePrevEmpire = async (word) => {
    const prevEmpire = await findWord({ wordId: word.empireId });
    await prevEmpire.updateOne({ $pull: { subjects: word._id } });
};

/**
 * @param {doc} word
 * @param {string} empireId
 */
const updateEmpire = async (word, empireId) => {
    const empire = await findWord({ wordId: empireId });
    word.empireId = empireId;
    const newSubjects = [...word.subjects, ...empire.subjects, word._id];
    await empire.updateOne({ subjects: newSubjects });
    word.subjects = [];
    return word;
};

/**
 * @param {string} gameId
 * @returns {Promise}
 */
const findGameWords = async (gameId) => {
    const words = await Word.find({ game: gameId }).select(WordQuerySelect);
    return words;
};

module.exports = {
    findWord,
    findGame,
    findGameWords,
    updateEmpire,
    updatePrevEmpire,
    GameQuerySelect,
    WordQuerySelect
};
