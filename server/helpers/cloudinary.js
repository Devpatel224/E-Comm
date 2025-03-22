const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name : 'dogvcrfrs',
    api_key:'157511291718163',
    api_secret:'C9VmJizVLDyrnlAeSPvwMRTIDQ0'
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

