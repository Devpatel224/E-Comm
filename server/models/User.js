const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength : [3,"Username is short"]
    },
    email :{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password :{
        type:String,
        required:true,
        unique:true
    },
    role:{
       type : 'String',
       default : 'user'
    }
})

module.exports  = mongoose.model('User',userSchema)