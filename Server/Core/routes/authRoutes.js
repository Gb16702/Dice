const express = require('express');
const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');

const path = require('path')
const formValidation = require(path.join(__dirname, "../utils/formValidation"))

const router = express.Router();

router.post("/api/login", async (req, res) => {
    try {

    console.log("OK2");

    if(req.method !== "POST")
        return res.status(405).send("Méthode non autorisée")

    if(!req.body) {
        return res.status(400).send("Requête invalide")
    }

    const { email, password } = req.body
    console.log(req.body);

    // const errors = formValidation({email, password})
    // console.log(errors);
    // if(Object.keys(errors).length > 0) return res.status(400).send('Test')
    //! A regarder

    console.log("TEST");

    const user = await User.findOne({email}).populate('roles', 'name grade')

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!user) {
        return res.status(404).send("Utilisateur introuvable")
    }

    if(isPasswordValid) {
        return res.status(401).send("Identifiants invalides")
    }

    if(user) {
        const {password, ...userWithoutPassword} = user.toObject();
        console.log(userWithoutPassword, "userWithoutPassword");
         return res.status(200).send({
            userWithoutPassword,
         })
    }
    else
        return res.status(401).send("Echec de l'authentification");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur serveur")
    }

})

module.exports = router