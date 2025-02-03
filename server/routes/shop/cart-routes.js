const express = require('express');
const router = express.Router();

const { addToCart, fetchToCart , deleteCartItem , updateCartItemQty} = require('../../controllers/shop/cart-controller');



router.post('/add',addToCart)
router.get('/get/:userId',fetchToCart)
router.put('/update-cart',updateCartItemQty)
router.delete('/:userId/:productId',deleteCartItem)

module.exports = router;