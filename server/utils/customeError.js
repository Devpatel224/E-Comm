

exports.createCustomeError = (statuscode,message)=>{
    const err = new Error()
    err.statuscode = statuscode
    err.message = message
    err.success = false
    
    return err
}  