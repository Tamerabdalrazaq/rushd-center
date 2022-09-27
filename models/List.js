import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    words: [mongoose.ObjectId]
})

module.exports = mongoose.models.List || mongoose.model("List", ListSchema);