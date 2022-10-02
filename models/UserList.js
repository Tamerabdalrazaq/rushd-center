import { USER_BASE_PHASE } from 'data/settings';
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const UserListSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    originalList: {
        type: mongoose.ObjectId,
        trim: true,
    },
    wordsList: [{
        _id: mongoose.ObjectId,
        dueTime: {
            type: Number,
            required: true,
            default: -1,
        },
        phase: {
            type: Number,
            default: USER_BASE_PHASE,
        }
    }],
})

module.exports = mongoose.models.UserList || mongoose.model("UserList", UserListSchema);