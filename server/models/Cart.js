const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items : [
        {
            productId : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"productModel",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("Cart",cartSchema)