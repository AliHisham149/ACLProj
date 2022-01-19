const {Router} = require('express');
const userRouter = new Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const existing = require('./../Models/existingUser.js');
const admin = require('./../Models/admins.js');
const passwordValidator = require('password-validator');


userRouter.post("/login", async (req, res) => {
    try{
  const dbUser = await existing.findOne({ username: req.body.username })
       
        if (!dbUser) {
        const dbAdmin =  await admin.findOne({ username: req.body.username })
        console.log(">>>>>>>>>>>>>EL ANA 3ayzo" +dbAdmin);
                if (!dbAdmin)
                    res.status(403).send("This username does not exist")
             const isCorrect = await bcrypt.compare(req.body.password, dbAdmin.password)
                    if (isCorrect) {
                        console.log("correct")
                        const payload = {
                            id: dbAdmin._id,
                            username: dbAdmin.username
                        }

                  const token =  jwt.sign(
                            payload,
                            //process.env.JWT_SECRET
                            "test",
                            { expiresIn: 86400 },
                            (err, token) => {
                                if (err)
                                    return res.json({ message: err })
                              res.status(201).send({
                                    message: "Success",
                                    token: "Bearer " + token,
                                    _id: dbAdmin._id.toString()
                                }
                                )
                                console.log(res)
                                console.log("logged")
                            }
                            
                        )
                        res.status(200).json({"token":token,"user":dbAdmin,"type":"admin"});

                    }
                    else {
                        console.log("inv")
                        return res.status(403).send("Invalid credentials")
                    }
               
            
        }
        else {
    
            bcrypt.compare(req.body.password, dbUser.password).then(isCorrect1 => {
                if (isCorrect1) {
                  
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username
                    }

              const token1 =  jwt.sign(
                        payload,
                        //process.env.JWT_SECRET
                        "test",
                        { expiresIn: 86400 },
                        (err, token1) => {
                            if (err)
                                return res.json({ message: err })
                          res.status(201).send({
                                message: "Success",
                                token1: "Bearer " + token1,
                                _id: dbUSer._id.toString()
                            }
                            )
                            console.log(res)
                            console.log("logged")
                        }
                        
                    )
                    res.status(200).json({"token":token1,"user":dbUser,"type":"user"});

                }
                else {
                    console.log("inv")
                    return res.status(403).send("Invalid credentials")
                }

            })

        }
    
}catch(err){
    console.log(err);
}

}

)

userRouter.get("/sendUserInfo", (req, res) => {
    existing.find({}).exec(function (err, data) {
        res.send(data);
    })
})
userRouter.post("/editProfile", async (req, res) => {
    found1 = false;
    found = false;
    foundUsername = false;
    msg = "";
    if (req.body.firstName != undefined && typeof req.body.firstName != "string") {
        res.status(403).send("First name has to be a string")
        return;
    }

    if (req.body.middleName != undefined && typeof req.body.middleName != "string") {
        res.status(403).send("Middle name must be a string")
    }
    if (req.body.lastName != undefined && typeof req.body.lastName != "string") {
        res.status(403).send("passport has to be a string")
        return;
    }
    if (req.body.title != undefined && typeof req.body.title != "string") {
        res.status(403).send("Title must be a string")
    }
    if (req.body.dateOfBirth != undefined && typeof req.body.dateOfBirth != date) {
        res.status(403).send("Date of birth must be a date")
    }
    if (req.body.passport != undefined) {
        if (typeof req.body.passport != "string") {
            res.status(403).send("passport has to be a string")
            return;
        }
        else {
            const query = await existing.find({ passport: req.body.passport })
            if (query.length == 0)
                var found = false
            else {
                c = query1[0].passport;
                if (c == req.body._id) {
                    found = false;
                }
                found = true
            }

        }
    }
    else if (req.body.email != undefined) {
        if (typeof req.body.email != "string") {
            res.status(403).send("email has to be a string")
            return;
        }
        else {
            const query1 = await existing.find({ email: req.body.email })
            if (query1.length == 0)
                var found1 = false
            else {
                c = query1[0]._id
                if (c == req.body._id) {
                    found1 = false;
                }
                else {
                    found1 = true
                }
            }
        }
    }

    if (found1) {
        res.status(403).send("This email is already registered")
        //msg = msg.concat("This email is already taken")
    } else if (found) {
        res.status(403).send("This passport number already exists in our database")
        // msg = "This passport number already exists in our database, ";
    }
    else {
        existing.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
            res.status(201).send(leads);
        })
    }

})


userRouter.post("/usersRegister", async (req, res) => {

    const user = await new existing({
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'passport': req.body.passport,
        'email': req.body.email,
        'password': req.body.password
    })

    const takenEmail = await existing.findOne({ email: req.body.email })
    //const takenEmailFromAdmin = await admin.findOne({ email: req.body.email })
    const takenPassport = await existing.findOne({ passport: req.body.passport })
    var schema = new passwordValidator();
    


    if (takenEmail) {

        res.json({ message: "This email already exists in our database. Please use another one" })
    }
    if (takenPassport) {
        res.json({ message: "This passport number already exists in our database. Please use another one." })
    }
    else if ((schema.validate(req.body.password)) == false) {
        res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
        console.log(schema.validate(user.password, { details: true }));
    }

    else {
        user.password = await bcrypt.hash(req.body.password, 10)
        const dbUser = new existing({
            username: user.email.split("@")[0],
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            passport: user.passport,
            email: user.email
        })


        if (!(user.email.includes("@")))
            res.json({ message: "This email is not valid" })



        else {
            dbUser.save()
            res.status(201).send("Registered successfully!")
        }
    }

});

userRouter.post("/adminsRegister", async (req, res) => {
    const newAdmin = await new admin({
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'email': req.body.email,
        'password': req.body.password
    })

    const takenEmail = await admin.findOne({ email: req.body.email })
    const takenEmailFromUser = await existing.findOne({ email: req.body.email })

    var schema = new passwordValidator();



    if (takenEmail || takenEmailFromUser) {
        res.json({ message: "This email already exists in our database. Please use another one" })
    }

    else if ((schema.validate(req.body.password)) == false) {
        res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
        console.log(schema.validate(user.password, { details: true }));
    }

    else {
        newAdmin.password = await bcrypt.hash(req.body.password, 10)
        const dbAdmin = new admin({
            username: newAdmin.email.split("@")[0],
            password: newAdmin.password,
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            email: newAdmin.email
        })


        if (!(newAdmin.email.includes("@")))
            res.json({ message: "This email is not valid" })



        else {
            dbAdmin.save()
            res.status(201).send("Registered successfully!")
        }
    }

})


userRouter.post("/changeAdminsPassword", async (req, res) => {

    const myOldPassword = await admin.findOne({ _id: req.body._id })
    const correct = bcrypt.compare(req.body.oldPassword, myOldPassword.password).then(async isMatching => {
        if (isMatching) {
            var schema = new passwordValidator();
    
            if ((schema.validate(req.body.newPassword)) == false) {
                res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
                //console.log(schema.validate(user.password, { details: true }));
            }
            await admin.updateOne({ _id: req.body._id }, { password: await bcrypt.hash(req.body.newPassword, 10) })
            res.json({ message: "Your password has been successfully updated" })
        }
        else {
            res.json({ message: "Please enter your old password successfully" })
        }
    })
})

userRouter.post("/changeMyPassword", async (req, res) => {
    const myOldPassword = await existing.findOne({ _id: req.body._id })
    const correct = bcrypt.compare(req.body.oldPassword, myOldPassword.password).then(async isMatching => {
        if (isMatching) {
            var schema = new passwordValidator();
          
            if ((schema.validate(req.body.newPassword)) == false) {
                res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
                //console.log(schema.validate(user.password, { details: true }));
            }
            await existing.updateOne({ _id: req.body._id }, { password: await bcrypt.hash(req.body.newPassword, 10) })
            res.json({ message: "Your password has been successfully updated" })
        }
        else {
            res.json({ message: "Please enter your old password successfully" })
        }
    })
})

module.exports = userRouter;
