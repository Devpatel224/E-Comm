const productModel = require('../../models/Product')


const getFilteredProducts = async(req,res,next)=>{
    try{
        let {category = [] , brand = [] , sortBy = "price-lowtohigh"} = req.query

        let filters = {};
        
        if(category.length > 0) filters.category = {$in:category.split(",")}

        if(brand.length) filters.brand = {$in:brand.split(",")}
        
        console.log(filters)
        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                 sort.price = 1
                break;
            case "price-hightolow":
                 sort.price = -1
                break;
            case "title-atoz":
                 sort.title = 1 
                break;
            case "title-ztoa":
                 sort.title = -1
                break;
        
            default:
                sort.price = 1
                break;
        }

        const products = await productModel.find(filters).sort(sort)

        res.status(200).json({
            success:true,
            data:products
        })
    }catch(error){
        next(error)
    }
}

const getProductDetails = async(req,res,next)=>{
    try{
        const {id} = req.params;

        const product = await productModel.findById(id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        res.status(200).json({
            success:true,
            data:product,
        })
    }catch(e){
        next(e)
    }
}

module.exports = {getFilteredProducts , getProductDetails}
