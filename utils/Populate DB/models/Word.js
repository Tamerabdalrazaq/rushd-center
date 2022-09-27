const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: {
        type: String,
        required: true,
        trim: true,
    },
    meaning: {
        type: String,
        required: true,
        trim: true,
    },
    definitions: [[String]],
    examples: [[String]],
    synonymes: [[String]],
    parent: mongoose.ObjectId
})

module.exports = mongoose.models.Word || mongoose.model("Word", WordSchema);