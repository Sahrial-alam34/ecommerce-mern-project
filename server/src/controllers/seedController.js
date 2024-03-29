const data = require('../data')
const User = require('../model/userModel')
const seedUser = async(req, res, next) =>{
    try {

        //deleting all existing user
        await User.deleteMany({})

        //inserting new user
        const users = await User.insertMany(data.users)

        //successful response
        return res.status(201).json(users);
    } catch (error) {
        next(error)
    }
}

module.exports = {seedUser}