require('dotenv').config()



const ServerPort = process.env.SERVER_PORT || 3002
const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/ecommerceMernDB'

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.jpg';

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'dfkjdfireslkoe466564632dfdfdeev'


const smtpUsername = process.env.SMTP_USERNAME|| ''
const smtpPassword = process.env.SMTP_PASSWORD|| ''



module.exports = {
    ServerPort,mongodbURL, defaultImagePath ,jwtActivationKey , smtpUsername, smtpPassword
}