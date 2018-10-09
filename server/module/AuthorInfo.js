const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AuthorSchema = new Schema({
    id: {
        type: Number,
        default:1,
    },
    name: {
        type: String,
    },
    present: {
        type:String, // 个人介绍
    },
    ArticleNum :{
        type:Number // 文章总数
    },
    sayNumber :{
        type:Number // 文章总数
    },
    totalAccess: {
        type: Number,  //访问量
        default:0,
        
    },
    tag: {
        type: Array,  //云标签
    },
    lastArticle: {
        type:Object, //文章列表------后续修改
    },
    lastSay: {
        type:Object, //文章列表------后续修改
    }
})
module.exports = AuthorInfo = mongoose.model("authorinfo", AuthorSchema);
