import mongoose from 'mongoose'

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
    example: {
        type: String,
        required: false,
    },
    parent: mongoose.ObjectId
})

module.exports = mongoose.models.Word || mongoose.model("Word", WordSchema);