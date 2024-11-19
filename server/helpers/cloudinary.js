const cloudinary = require("cloudinary").v2
const multer = require("multer")

cloudinary.config({
    cloud_name : 'dogvcrfrs',
    api_key:'157511291718163',
    api_secret:'C9VmJizVLDyrnlAeSPvwMRTIDQ0'
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    });
    return result;
}   

const upload = multer({storage})

module.exports = {upload,imageUploadUtils}

