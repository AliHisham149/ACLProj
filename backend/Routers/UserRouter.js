const {Router} = require('express');
const User = require('../models/users');
const userRouter = new Router();
const { v4: uuidv4 } = require('uuid');


userRouter.get("/createUser",(req,res) =>{
    var today = new Date();
    const user1 = new user({
        Uid: uuidv4(),//Generate new random user ID 
        Name:req.body.name,
        Email:req.body.email,
        Password:req.body.password,
        DateOfBirth:req.body.dateOfBirth , 
    })
    user1.save().then((result) => {
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })
})

userRouter.post("/signup",(req,res)=>{
    //Signup Code to be implemented bokra el sobh
})

module.exports = userRouter;
