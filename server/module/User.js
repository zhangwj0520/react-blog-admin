const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    userName: {
        type: String,
        rquired:true
    },
    password: {
        type: String,
        rquired:true
    },

    identity: {
        type: String,
        rquired:true
    },
    data: {
        type: String,
        default:Date.new
    },
})
module.exports = User=mongoose.model("users",UserSchema)