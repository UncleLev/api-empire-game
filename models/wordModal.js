const mongoose = require('mongoose');

const { Schema, model, ObjectId } = mongoose;

const wordSchema = new Schema({
	game: { type: ObjectId, ref: '' },
	value: { type: String, required: true, trim: true, min: 2, max: 256 },
	fake: { type: String, default: false },
	empireId: { type: ObjectId, ref: 'Word', default: null },
	subjects: [{ type: ObjectId, ref: 'Word' }]
});

const Word = model('Word', wordSchema);

module.exports = Word;
