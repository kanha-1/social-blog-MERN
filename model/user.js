const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        min:6,
        max:100
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        min:6,
        max:100
    },
    mobile:{
        type:Number,
        required: false,
        
    },
    password:{
        type:String,
        // required:true,
        min:6,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    },
    isLoggedIn:{
        type:Boolean,
        // required: false,
    },
    pic:{ 
        type: String ,
        default:"https://res.cloudinary.com/dsseuwzzr/image/upload/v1599320656/nfwqmevulwuimrqbmcws.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

module.exports = mongoose.model("Users",UserSchema)