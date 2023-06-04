const express = require('express');
const User = require('../database/schemas/User');
const Role = require('../database/schemas/Role');
const path = require('path');
const dotenv = require('dotenv').config({path : path.join(__dirname, "../../../.env")});
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/api/users", async (req, res) => {

    const defaultRole = await Role.findOne({default: true})

    let userRole = defaultRole._id

    if(req.body.email === process.env.FOUNDER) {
        const founderRole = await Role.findOne({name : "Fondateur"})
        userRole = founderRole._id
    }

    try {
        let password = req.body.password

        if(password)
            password = (await bcrypt.hash(req.body.password, 12)).slice(0, 48);

        const user = new User({
            username: req.body.username,
            email:req.body.email,
            password,
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
        res.status(200).send(users)
    }

    catch(e) {
        console.log(e);
        res.status(500).send(`Erreur : ${e}`)
    }
})

module.exports = router;