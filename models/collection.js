const mongoose = require('mongoose');
const Joi = require('joi');

const FlashcardSchema = new mongoose.Schema({
    term: { type: String, required: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

function validateFlashcard(Flashcard) {
    const schema = Joi.object({
        term: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
    });
    return schema.validate(Flashcard);
}

const userSchema = new mongoose.Schema({
    cardDeck: { type: [FlashcardSchema], default: [] },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
    });
    return schema.validate(user);
}

exports.Flashcard = Flashcard;
exports.User = User;
exports.validate = validateUser;
exports.validate = validateFlashcard;
exports.FlashcardSchema = FlashcardSchema;
exports.userSchema = userSchema;