const productModel = require('../../models/Product');
const cartModel = require('../../models/Cart');
const { createCustomeError } = require('../../utils/customeError');


const addToCart = async (req, res, next) => {
  try {
    const {userId,productId,quantity} = req.body;

    if(!userId || !productId || quantity <= 0){
        next(createCustomeError(401,"Invalid Data Provided"))
    }

    const product = await productModel.findById(productId)
    if(!product) next(createCustomeError(404,"Product Not Found"))

    let cart = await cartModel.findOne({userId});
    
    if(!cart){
        cart = await cartModel.create({userId,items:[]})
    }
    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

    if(findCurrentProductIndex === -1){
        cart.items.push({productId,quantity})
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save()

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
    const {userId} = req.params;

    if(!userId){
        next(createCustomeError(401,"Invalid Data Provided"))
    }

    const cart = await cartModel.findOne({userId}).populate({
        path : 'items.productId',
        select : 'image title price salePrice'
    })

    if(!cart) next(createCustomeError(404,"Cart Not Found"))

    const validItems = cart.items.filter(productItem => productItem.productId);

    if(validItems.length < cart.items.length){  // Very important Logic
        cart.items = validItems;
        await cart.save()
    }

    const populateCartItems = validItems.map(item => ({
        productId : item.productId._id,
        image : item.productId.image,
        price : item.productId.price,
        salePrice : item.productId.salePrice,
        title : item.productId.title,
        quantity : item.quantity
    }))

    res.status(200).json({
        success:true,
        data : {
            ...cart._doc,  // send only raw data exclude methods like save , populate etc from mongoose object
            items : populateCartItems // send newly created items
        } 
    })

  } catch (e) {
    next(e);
  }
};


const updateCartItemQty = async (req, res, next) => {
  try {
    const {userId,productId,quantity} = req.body;

    if(!userId || !productId || quantity <= 0){
        next(createCustomeError(401,"Invalid Data Provided"))
    }

    const cart = await cartModel.findOne({userId});

    if(!cart) next(createCustomeError(404,"Cart Not Found"));

    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

    if(findCurrentProductIndex === -1){
        next(createCustomeError(404,"Product Not Found in Cart"))
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save()

    await cart.populate({
        path:'items.productId',
        select : 'image title price salePrice'
    })

    const populateCartItems = cart.items.map(item => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        title: item.productId ? item.productId.title : "Prodcut Not Found",
        quantity: item.quantity 
    }));
    

    res.status(200).json({
        success:true,
        data : {
            ...cart._doc,  // send only raw data exclude methods like save , populate etc from mongoose object
            items : populateCartItems // send newly created items
        } 
    })

  } catch (e) {
    next(e);
  }
};


const deleteCartItem = async (req, res, next) => {
  try {
    const {userId,productId} = req.params;

    if(!userId || !productId){
       return  next(createCustomeError(401,"Invalid Data Provided"))
    }

    const cart = await cartModel.findOne({userId}).populate({
        path : 'items.productId',
        select : 'image title price salePrice'
    })
    

    if(!cart)  return next(createCustomeError(404,"Cart Not Found"));

    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
    
    // if(findCurrentProductIndex === -1){   
    //     return next(createCustomeError(404,"Product Not Found in Cart"))
    // }

    cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

    await cart.save()
    
    await cart.populate({
        path:'items.productId',
        select : 'image title price salePrice'
    })

    const populateCartItems = cart.items.map(item => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        title: item.productId ? item.productId.title : "Prodcut Not Found",
        quantity: item.quantity 
    }));

    res.status(200).json({
        success:true,
        data : {
            ...cart._doc,  // send only raw data exclude methods like save , populate etc from mongoose object
            items : populateCartItems // send newly created items
        } 
    })
    
  } catch (e) {
    return next(e);
  }
};

module.exports ={
    fetchToCart,
    updateCartItemQty,
    deleteCartItem,
    addToCart
}
