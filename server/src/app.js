const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60* 1000, //1 minute
    max:5,
    message: 'Too many requests from this IP. Please try again later'
})

app.use(rateLimiter)
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use("/api/users",userRouter);
app.use("/api/seed",seedRouter);


// const isLoggedIn = (req, res, next) =>{
//     const login = true;
//     if(login){
//         req.body.id = 101;
//         next()
//     }
//     else{
//         return res.status(401).json({message: 'please login first'})
//     }
    
// }

app.get('/test', (req, res)=>{
    res.status(200).send({
        message:"api testing is working fine"
    })
})




//client error handling
app.use((req,res,next)=>{
    // res.status(404).json({message:'route not found'})
    // createError(404,'route not found')
    // next()
    //same as previous
    next(createError(404,'route not found'))
})
//server error handling --> all errors 
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
})


module.exports = app;