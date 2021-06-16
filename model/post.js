const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    Likes:[{type:ObjectId,ref:"Users"}],
    comment:[{
        text:String,
        name:String,
        postedBy:{type:ObjectId,ref:"Users"}
    }],
    postedBy:{
        type:ObjectId,
        ref:'Users'
    },

},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)
