const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AticlesSchema = new Schema({
    title: {
        type: String,
    },
    create_at: {
        type: Date,
        default:Date.now,
    },
    type :{
        type:String, 
    },
    access: {
        type: Number, 
        default:1,
    },
    tag: {
        type:Object, 
    },
    abstract: {
        type:String, 
    },
    content: {
        type:String
    },
    nature:{
        type:String
    }
})
module.exports = Articles = mongoose.model("articles", AticlesSchema);