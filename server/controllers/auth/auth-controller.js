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
            return next(createCustomeError(401,"User Already Exits"))
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
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
        return next(createCustomeError(400, "All fields are required"));
    }

    const exitedUser = await userModel.findOne({email})
    if(!exitedUser){
        return next(createCustomeError(401,"User Doesn't Exits"))
    }

    const checkpasswordMatch =await bcrypt.compare(password,exitedUser.password)
    if(!checkpasswordMatch){
        return next(createCustomeError(401,"Invalid Credentials"));
    }

    const token = jwt.sign({
        id:exitedUser._id,
        role:exitedUser.role,
        email:exitedUser.email,
        username:exitedUser.username
    },process.env.JWT_KEY,{expiresIn : '60min'})

    res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:"True",
        message:"Logged In Successfully",
        user:{
            email:exitedUser.email,
            role:exitedUser.role,
            id:exitedUser._id,
            username:exitedUser.username
        }
    }) 
    
  } catch (e) {
    next(e);
  }
};

// logout
const logoutUser = (req,res)=>{
    res.clearCookie('token').json({
        success:"true",
        message:"Logged out Successfully"
    })
}

// authmiddleware
const authmiddleware = async (req,res,next)=>{

    const token = req.cookies.token;
    if(!token){
        return next(createCustomeError(401,"Unauthorised user!"))
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded;
        next()
    }
    catch(e){
        return next(e)
    }
}

module.exports = { registerUser , loginUser,logoutUser ,authmiddleware };
