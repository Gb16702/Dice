const express = require('express');
const User = require('../database/schemas/User');
const Role = require('../database/schemas/Role');
const path = require('path');
const dotenv = require('dotenv').config({path : path.join(__dirname, "../../../.env")});
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/api/users", async (req, res) => {

    const {username, email, password} = req.body;

    const defaultRole = await Role.findOne({default: true})

    let userRole = defaultRole._id

    if(email === process.env.FOUNDER) {
        const founderRole = await Role.findOne({name : "Fondateur"})
        userRole = founderRole._id
    }

    const slug = username
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ").join("-")

    try {
        let userPassword = password

        if(userPassword)
            userPassword =(await bcrypt.hash(password, 12)).slice(0, 48);

        const user = new User({
            username,
            slug,
            email,
            password : userPassword,
            roles : [userRole],
        })

        await user.save()
        res.status(201).send(user)
    }

    catch(e) {
        console.log(e);
        res.status(500).send(`Erreur : ${e}`)
    }
})

router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }

    catch(e) {
        console.log(e);
        res.status(500).send(`Erreur : ${e}`)
    }
})

router.post("/api/google-login", async (req, res) => {
    console.log("POST-GOOGLE");
    try {
        const {email, name} = req.body;
        console.log(req.body);

        const defaultRole = await Role.findOne({default : true})

        let userRole = defaultRole._id

        const user = new User({
            username: name,
            email,
            role : userRole
        })

        await user.save();

        res.status(201).send({user})
    }
    catch(e) {
        console.log(e);
    }
})

module.exports = router;