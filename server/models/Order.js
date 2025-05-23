const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            quantity : Number,
        }
    ],
    addressInfo : {
        addressId : String,
        address : String,
        pincode : String,
        city : String,
        phone : String,
        notes : String
    },
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : Number,
    orderDate : Date,
    orderUpdateDate : Date,
    paymentId : String,
    payerId : String
})

module.exports = mongoose.model("Order", orderSchema);