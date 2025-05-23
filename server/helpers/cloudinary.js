const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name : 'dogvcrfrs',
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});
 


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {   
      folder: "uploads", 
      format: async () => "png", 
      public_id: (req, file) => file.fieldname + "-" + Date.now(),
    },
  }); 

const upload = multer({storage})

module.exports = {upload}

