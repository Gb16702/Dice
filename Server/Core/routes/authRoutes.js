const express = require('express');
const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');

const path = require('path')
const formValidation = require(path.join(__dirname, "../utils/formValidation"))

const router = express.Router();

router.post("/api/login", async (req, res) => {
    console.log("OK2");

    const { email, password } = req.body
    console.log(req.body);

    // const errors = formValidation({email, password})
    // console.log(errors);
    // if(Object.keys(errors).length > 0) return res.status(400).send('Test')
    //! A regarder

    console.log("TEST");

    const user = await User.findOne({email})

    if(user) {
        const {password, ...userWithoutPassword} = user.toObject();
        console.log(userWithoutPassword);
         return res.status(200).send({
            userWithoutPassword,
         })
    }
    else
        return res.status(401).send("Echec de l'authentification");
})

module.exports = router