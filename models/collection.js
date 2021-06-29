const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    term: { type: String, required: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionSchema);


module.exports = Collection;

function validateCollection(collection) {
    const scheme = Joi.object({
        term: Joi.string().min(2).max(50).required(),
        description: Joi.string().require(),
    });
    return schema.validate(collection);
}


module.exports = Collection;
exports.Validate = validateCollection;
exports.collectionSchema = collectionSchema;