const express = require('express');
const User = require('../database/schemas/User');
const Code = require('../database/schemas/Code');
const Token = require('../database/schemas/Token');
const argon = require('argon2');

const path = require('path')
const formValidation = require(path.join(__dirname, "../utils/formValidation"))

const router = express.Router();

const sendGrid = require('@sendgrid/mail');
const { set } = require('mongoose');

const dotenv = require('dotenv').config({path : path.join(__dirname, "../../../.env")});


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
    if(!await argon.verify(user.password, password, {
        type : argon.argon2id
    })) {
        console.log("FALSE");
        return res.status(401).send("Echec de l'authentification")
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

const deleteExpiredCode = async () => {
    const now = Date.now()
    await Code.deleteMany({expiration : {$lt : now}})
}

setInterval(deleteExpiredCode, 1000 * 60)

router.get("/api/getCode", async (req, res) => {
    if(req.method !== "GET")
        return res.status(405).send("Méthode non autorisée")

    if(!req.query.email)
        return res.status(400).send("Requête invalide")

    const emailPattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailPattern.test(req.query.email))
        return res.status(400).send("Requête invalide")

    let user = await User.findOne({email : req.query.email}).populate('roles', 'grade')
    user.toObject()
    console.log(user.roles.grade);

    if(!user)
        return res.status(404).send("Utilisateur introuvable")
    else if (user.roles.grade > 2) {
        return res.status(403).send("Vous n'avez pas les droits pour accéder à cette ressource")
    }

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const code = new Code({
        User : user._id,
        value : Math.floor(Math.random() * 1000000),
        expiration : Date.now() + 600000,
        isUsed : false
 })

    const mail = {
         to : req.query.email,
         from : process.env.FOUNDER,
         templateId : "d-23f8d651ccca44e0af99a4dec91bfc82",
         dynamic_template_data : {
             code : code.value
         }
     }

         try {
            await sendGrid.send(mail)
            await code.save()
            res.status(200).json(code);
         }

         catch(e) {
             console.log(e.response.body.errors);
             return res.status(500).json({message : "Erreur serveur"})
         }
})

router.post("/api/verifyCode", async (req, res) => {

    if(req.method !== "POST")
        return res.status(405).send("Méthode non autorisée")

    const {email, input} = req.body

    console.log(input);

    if(!email || !input)
    return res.status(400).send("Requête invalide")

    const emailPattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailPattern.test(email))
        return res.status(400).send("Requête invalide")

    const code = await Code.findOne({value : input, expiration : {$gt : Date.now()}, isUsed : false}).populate('User')

    if(!code)
        return res.status(404).send("Code introuvable")

    const expirationDate = new Date(code.expiration).toLocaleString('fr-FR', {timeZone : 'Europe/Paris'})

    if(expirationDate < Date.now())
        return res.status(401).send("Code expiré")

    const token = await Token.findOne({})
    console.log(token);

    try {
        if(token)
            return res.status(200).json({token})
        else {
            return res.status(404).send("Token introuvable")
        }
    }

    catch(e) {
        console.log(e);
        return res.status(500).json({message : "Une erreur est surevenue"})
    }
})

module.exports = router