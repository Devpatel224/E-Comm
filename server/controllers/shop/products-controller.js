const productModel = require('../../models/Product')


const getFilteredProducts = async(req,res,next)=>{
    try{
        const products = await productModel.find({})

        res.status(200).json({
            success:true,
            data:products
        })
    }catch(error){
        next(error)
    }
}

module.exports = {getFilteredProducts}
