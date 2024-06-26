const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    image: String,
    lists: [mongoose.ObjectId],
    scoresList: []
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);