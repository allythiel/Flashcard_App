const mongoose = require('mongoose');
const Joi = require('joi');

const collectionSchema = new mongoose.Schema({
    term: { type: String, required: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionSchema);

function validateCollection(collection) {
    const schema = Joi.object({
        term: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
    });
    return schema.validate(collection);
}


exports.Collection = Collection;
exports.validate = validateCollection;
exports.collectionSchema = collectionSchema;