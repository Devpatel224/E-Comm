const express = require("express");
const router = express.Router()

const {handleImageUpload , addProduct,fetchProducts,deleteProduct,editProduct} = require("../../controllers/admin/products-controller")
const {upload} = require("../../helpers/cloudinary")


router.post("/upload-image",upload.single('my_file'),handleImageUpload)
router.post("/add",addProduct)
router.put("/edit/:id",editProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/get",fetchProducts)


 module.exports = router