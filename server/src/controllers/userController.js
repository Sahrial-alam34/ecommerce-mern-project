const createError = require('http-errors');
const fs = require('fs').promises;
const User = require('../model/userModel');
const { successResponse } = require('./responseController');

const { findWithId } = require('../services/findItem');
const deleteImage = require('../helper/deleteImage');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey } = require('../secret');



const getUsers = async (req, res, next) => {
    // console.log(req.body.id)
    try {

        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*' + search + ".*", 'i')
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }

        const options = { password: 0 }

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit)

        const count = await User.find(filter).countDocuments();
        if (!users) throw createError(404, "no users found");
        return successResponse(res, {
            statusCode: 200,
            message: 'users were returned successfully',
            payload: {
                users,
                pagination: {
                    totalPage: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null

                }

            }
        })
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    // console.log(req.body.id)
    try {

        const id = req.params.id;

        const options = { password: 0 }
        const user = await findWithId(User, id, options)
        return successResponse(res, {
            statusCode: 200,
            message: 'user was returned successfully',
            payload: {
                user
            }
        })
    } catch (error) {

        next(error)
    }
}
const deleteUserById = async (req, res, next) => {
    // console.log(req.body.id)
    try {

        const id = req.params.id;

        const options = { password: 0 }
        const user = await findWithId(User, id, options)


        const userImagePath = user.image;
        deleteImage(userImagePath)
        // fs.access(userImagePath)
        // .then(()=>  fs.unlink(userImagePath))
        // .then(()=>   console.log("user image was deleted"))
        // .catch((err)=>console.error('user image does not exist'))
        // fs.access(userImagePath, (err) => {
        //     if (err) {
        //         console.error('user image does not exist')
        //     }
        //     else{
        //         fs.unlink(userImagePath, (err)=>{
        //             if(err){
        //                 throw err;
        //             }
        //             console.log("user image was deleted")
        //         })
        //     }

        // })
        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false
        })

        return successResponse(res, {
            statusCode: 200,
            message: 'user was delete successfully',

        })
    } catch (error) {

        next(error)
    }
}
const processRegister = async (req, res, next) => {
    // console.log(req.body.id)
    try {

        const { name, email, password, phone, address}= req.body;

        const userExists = await User.exists({email: email})
        if(userExists){
            throw createError(409, 'User with this email already exist. Please Login ')
        }

        //create jwt
        const token = createJSONWebToken({name, email, password, phone, address},jwtActivationKey, '10m')
        
        
        //prepare email


        //send email with nodemailer

        return successResponse(res, {
            statusCode: 200,
            message: 'user was created successfully',
            payload:{
                token
            }

        })

    } catch (error) {

        next(error)
    }
}

module.exports = { getUsers, getUserById, deleteUserById, processRegister };