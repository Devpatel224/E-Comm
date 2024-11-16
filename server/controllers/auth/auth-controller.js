const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require("../../models/User")


// register

const registerUser = async (req,res,next) => {
    const {username,email,password} = req.body
    try {
        const hashPassword = await bcrypt.hash(password,12)
        const newUser = new userModel.create({username,email,password:hashPassword})

        console.log(newUser)

        res.status(200).json({message:"Registration Successful",success:true})
    } catch (e) {
        console.log(e);
        next(e)
    }
}

// login
const login = async (req,res,next) => {
    const {email,password} = req.body
    try {
        
    } catch (e) {
        console.log(e);
        next(e)
    }
}


// logout



// authmiddleware




module.exports = { registerUser }