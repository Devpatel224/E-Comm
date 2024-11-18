const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/User")
const { createCustomeError } = require("../../utils/customeError");

// register


const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;    
    try {
        if (!username || !email || !password) {
            return next(createCustomeError(400, "All fields are required"));
        }

        const exitedUser = await userModel.findOne({
            $or:[{email},{username}],
        });
        if(exitedUser){
            next(createCustomeError(401,"Invalid Credentials"))
        }          
     
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword,
        });
        
        console.log(newUser);
  
        res.status(200).json({
            message: "Registration Successful",
            success: true,
        });
    } catch (e) {    
        if(e.code === 11000) {
            console.log("Duplicate key error details:", e.keyValue)
            const duplicateField = Object.keys(e.keyValue)[0];
            const duplicateValue = e.keyValue[duplicateField];
            return res.status(401).json({
                message: `Duplicate value detected: ${duplicateField} (${duplicateValue})`,
            });
        }
        next(e);
    }
};


// login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// logout

// authmiddleware

module.exports = { registerUser };
