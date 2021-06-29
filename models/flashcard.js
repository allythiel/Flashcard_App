const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    term: { type: String, required: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);


module.exports = Flashcard;