const createError = require('http-errors')
const users = require("../model/userModel");


const getUsers = (req, res,next)=>{
   // console.log(req.body.id)
    try {
        res.status(200).send({
            message:"users were returned",
            users: users,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getUsers;