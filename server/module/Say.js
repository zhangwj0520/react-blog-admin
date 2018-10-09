const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SaySchema = new Schema({
    say: {
        type: String,
    },
    create_at: {
        type: Date,
        default:Date.now,
    },
})
module.exports = Say = mongoose.model("say", SaySchema);