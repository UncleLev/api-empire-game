const mongoose = require('mongoose');

const { Schema, model, ObjectId } = mongoose;

const gameSchema = new Schema({
    inviteCode: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
        trim: true
    },
    words: [{ type: ObjectId, ref: 'Word' }]
});

const Game = model('Game', gameSchema);

module.exports = Game;
