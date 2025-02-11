const addressModel = require('../../models/Address')
const { createCustomeError } = require('../../utils/customeError')

const addAddress = async (req,res,next)=>{
    try {
        console.log(req.body)
        const { userId, address, city ,pincode, phone,notes} = req.body
       
        if(!userId || !address || !city || !pincode || !phone|| !notes){
            return next(createCustomeError(401,"Invalid Data"))
        }

        const newAddress = await addressModel.create({
            userId,address,city,pincode,notes,phone
        })

        res.status(201).json({
            success:true, 
            data:newAddress
        })
    } catch(error) {
        return next(error)
    }
}

const fetchAllAddress = async (req,res,next)=>{
    try {
        const {userId} = req.params

        if(!userId) return next(createCustomeError(401,"UserID in not found"))

         const address = await addressModel.find({userId})
         
         res.status(201).json({
            success:true,
            data:address
         })
    } catch(error) {
       return next(error)
    }
}

const editAddress = async (req,res,next)=>{
    try {
        const {userId,addressId} = req.params;
        const formData = req.body

        if(!userId || !addressId) return next(createCustomeError(401,"Data is Invalid"))

         const address = await addressModel.findOneAndUpdate({
            _id:addressId,userId
         },formData,{new : true})
         
         if(!address) return next(createCustomeError(404,"Address Doesn't Found"))

         res.status(200).json({
            success:true,
            data:address
         })   
    } catch(error) {
       return next(error)
    }
}

const deleteAddress = async (req,res,next)=>{
    try {
        const {userId,addressId} = req.params;
        

        if(!userId || !addressId) return next(createCustomeError(401,"Data is Invalid"))

            const address = await addressModel.findOneAndDelete({
                _id:addressId,userId
             })
             
            if(!address) return next(createCustomeError(404,"Address Doesn't Found"))

            res.status(200).json({
                success:true,
                data:address
            })   
    } catch(error) {
       return next(error)
    }
}

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress }