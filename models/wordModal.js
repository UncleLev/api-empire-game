const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const wordSchema = new Schema({
    game: { type: Schema.ObjectId, ref: 'Game', required: true },
    value: { type: String, required: true, trim: true, min: 2, max: 256 },
    fake: { type: String, default: false },
    empireId: { type: Schema.ObjectId, ref: 'Word', default: null },
    subjects: [{ type: Schema.ObjectId, ref: 'Word' }]
});

const Word = model('Word', wordSchema);

module.exports = Word;
