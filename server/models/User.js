const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username :{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minLength: [3, "Username is too short"],
    },
    email :{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true
    },
    password :{
        type:String,
        required:[true,"password is required"]
    },
    role:{
       type : 'String',
       default : 'user'
    }
})

module.exports  = mongoose.model('userModel',userSchema)