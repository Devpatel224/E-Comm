const { imageUploadUtils } = require("../../helpers/cloudinary");
const productModel = require("../../models/Product")
const {createCustomeError} = require("../../utils/customeError")

const handleImageUpload = async (req, res , next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    res.json({
      success: true,
      result: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// add a new product
const addProduct = async (req, res , next) => {
  try {
    const {image, title, description, category, brand, price, salePrice, totalStock} = req.body

      const createdProduct = await productModel.create({image, title, description, category, brand, price, salePrice, totalStock})

      res.status(201).json({
        success:true,
        data:createdProduct
      })
  } catch (err) {
    next(err);
  }
};

// fetch all products
const fetchProducts = async (req, res , next) => {
    try {  
      const listOfProducts = await productModel.find();
      res.status(201).json({
        success:true,
        data:listOfProducts
      })

    } catch (err) {
      return next(err);
    }
  };
 

// edit a product
const editProduct = async (req, res , next) => {
    try {
      const {image, title, description, category, brand, price, salePrice, totalStock} = req.body
        const {id} = req.params

        const findProduct = await productModel.findById(id);
        if(!findProduct) return next(createCustomeError(401,"Product not Found"))
            
        findProduct.title = title ||  findProduct.title
        findProduct.description = description ||  findProduct.description
        findProduct.category = category ||  findProduct.category
        findProduct.brand = brand ||  findProduct.brand
        findProduct.price = price === '' ? 0 : price ||  findProduct.price
        findProduct.salePrice = salePrice === '' ? 0 : salePrice ||  findProduct.salePrice
        findProduct.totalStock = totalStock ||  findProduct.totalStock
        findProduct.image = image ||  findProduct.image

        await findProduct.save();
        res.status(200).json({
            success:true,
            data : findProduct
        })

    } catch (err) {
      next(err);
    }
  };

// delete a product

const deleteProduct = async (req, res , next) => {
    try {
      const {id} = req.params
      const product = await productModel.findByIdAndDelete(id)

      if(!product) return next(createCustomeError(404,"Product not Found"))

       res.status(201).json({
        success:true,
        messsage:"Product Deleted successfully"
       })
    } catch (err) {
      next(err);
    }
  };


module.exports = { handleImageUpload, addProduct, fetchProducts,editProduct,deleteProduct };
