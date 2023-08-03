const createError = require('http-errors')



const getUsers = (req, res,next)=>{
   // console.log(req.body.id)
    try {
        res.status(200).send({
            message:"users were returned",
            
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getUsers;