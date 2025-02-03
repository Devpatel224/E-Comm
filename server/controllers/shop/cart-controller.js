const Cart = require('../../models/Cart');
const product = require('../../models/Product');
const { createCustomeError } = require('../../utils/customeError');


const addToCart = async (req, res, next) => {
  try {
    const {userId,productId,quantity} = req.body;

    if(!userId || !productId || quantity <= 0){
        next(createCustomeError(401,"Invalid Data Provided"))
    }

    const product = await product.findById(productId)
    if(!product) next(createCustomeError(404,"Product Not Found"))

    let cart = await Cart.findOne({userId});
    
    if(!cart){
        cart = await Cart.create({userId,items:[]})
    }
    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

    if(findCurrentProductIndex === -1){
        cart.items.push({productId,quantity})
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await Cart.save()

    return res.status(200).json({
        success : true,
        data : cart
    })
  } catch (e) {
    next(e);
  }
};
const fetchToCart = async (req, res, next) => {
  try {
    

  } catch (e) {
    next(e);
  }
};
const updateCartItemQty = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};
const deleteCartItem = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};

module.exports ={
    fetchToCart,
    updateCartItemQty,
    deleteCartItem,
    addToCart
}
