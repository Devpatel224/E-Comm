const express = require("express");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require('cors');

const authRouter = require('./routes/auth/auth-route')
const adminProductsRouter = require("./routes/admin/products-routes")
const shopProductsRouter = require("./routes/shop/products-routes")
const shopCartRouter = require("./routes/shop/cart-routes")
const addressRouter = require("./routes/shop/address-routes")
const orderRouter = require("./routes/shop/order-routes")

const app = express()
const PORT = process.env.PORT || 3000


require('dotenv').config()


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Db connected")
})
.catch((err)=>{
    console.log(err)
})


// Middleware

app.use(cors(
    {
      origin:'http://localhost:5173',
      credentials:true,
      methods:['GET','POST','DELETE','PUT'],
      allowedHeaders:[
        "Content-Type",
        "Authorizatoin",
        "Cache-Control",
        "Expires",
        "Pragma"
      ]
    }
))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/auth',authRouter)
app.use('/admin/products',adminProductsRouter)
app.use('/shop/products',shopProductsRouter)
app.use('/shop/cart',shopCartRouter)
app.use('/shop/address',addressRouter)
app.use('/shop/order',orderRouter)

app.use((err,req,res,next)=>{
  let statuscode = err.statuscode || 500
  let message = err.message || "Some Error occured"

  res.status(statuscode).json({
    success : "false",
    message,
    statuscode,
  })
})

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
})



