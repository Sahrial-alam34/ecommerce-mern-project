const {Schema, model} = require('mongoose');                     
const bcrypt = require('bcrypt');                     
const { defaultImagePath } = require('../secret');

const userSchema = new Schema({
    name: {
        type: String,
        require:[true, 'User name is required'],
        trim: true, //   a    nisul   i slam= avoid that
         maxLength:[31, 'The length of user name can be maximum 31 characters'],
        minLength:[3, 'The length of user name can be minimum 3 characters']
        
     
    },
    email:{
        type: String,
        require:[true, 'User Email is required'],
        trim: true, //   a    nisul   i slam= avoid that
        unique:true,
        lowercase:true,
        validate:{
            validator: (v)=>{
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v))
            },
            message:'Please enter a valid email'

        },
    },
    password:{
        type: String,
        require:[true, 'User password is required'],
        trim: true, //   a    nisul   i slam= avoid that
        minLength:[6, 'The length of user name can be minimum 6 characters'],
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image:{
        type: String,
        default: defaultImagePath
        
    },
    address:{
        type: String,
        require:[true, 'User address is required'],
        
    },
    phone:{
        type: String,
        require:[true, 'User phone is required'],
        
    },
    isAdmin:{
        type: Boolean,
        default: false
        
    },
    isBanned:{
        type: Boolean,
        default: false
        
    },
}, {timestamps: true})


const User = model('Users', userSchema)
module.exports = User;