const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const gameSchema = new Schema({
    inviteCode: {
        type: String
    },
    category: {
        min: 2,
        max: 270,
        type: String,
        required: true,
        trim: true
    },
    words: [{ type: Schema.ObjectId, ref: 'Word' }]
});

gameSchema.set('timestamps', {
    createdAt: true,
    updatedAt: true
});

const Game = model('Game', gameSchema);

module.exports = Game;
