const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    parent: String,
    words: [mongoose.ObjectId],
    imgSrc: String
})

module.exports = mongoose.models.List || mongoose.model("List", ListSchema);