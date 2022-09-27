const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const FormSchema = new Schema({
    name: String,
    phone: String,
    city: String,
    personal_note: String,
    education: String,
    subject: String,
    time: String,
})

module.exports = mongoose.models.Form || mongoose.model("Form", FormSchema);