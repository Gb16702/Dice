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


    if(req.method !== "POST")
        return res.status(405).send({message : "Méthode non autorisée"})

    if(!req.body) {
        return res.status(400).send({message : "Requête invalide"})
    }

    const { email, password } = req.body


    const user = await User.findOne({email}).populate('roles', 'name grade')
    if(!await argon.verify(user.password, password, {
        type : argon.argon2id
    })) {
        return res.status(401).send({message : "Echec de l'authentification"})
    }

    if(user) {
        const {password, ...userWithoutPassword} = user.toObject();
         return res.status(200).send({
            userWithoutPassword,
         })
    }
    else
        return res.status(401).send({message : "Echec de l'authentification"});
    } catch (error) {
        return res.status(500).send({message : "Une erreur est survenue"})
    }

})

const deleteExpiredCode = async () => {
    const now = Date.now()
    await Code.deleteMany({expiration : {$lt : now}})
}

setInterval(deleteExpiredCode, 1000 * 60)

router.get("/api/getCode", async (req, res) => {
    if(req.method !== "GET")
        return res.status(405).send({message : "Méthode non autorisée"})

    if(!req.query.email)
        return res.status(400).send({message : "Requête invalide"})

    const emailPattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailPattern.test(req.query.email))
        return res.status(400).send({message : "Requête invalide"})

    let user = await User.findOne({email : req.query.email}).populate('roles', 'grade')
    user.toObject()

    if(!user)
        return res.status(404).send({message : "Utilisateur introuvable"})
    else if (user.roles.grade > 2) {
        return res.status(403).send({message : "Vous n'avez pas la permission d'effectuer cette action"})
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
         templateId : "d-de5ebccee688482bb68dbf2000acad84",
         dynamic_template_data : {
             code : code.value,
             username : user.username
         }
     }

         try {
            await sendGrid.send(mail)
            await code.save()
            res.status(200).json(code);
         }

         catch(e) {
             return res.status(500).json({message : "Erreur serveur"})
         }
})

router.post("/api/verifyCode", async (req, res) => {

    if(req.method !== "POST")
        return res.status(405).send({message : "Méthode non autorisée"})

    const {email, input} = req.body

    if(!email || !input)
    return res.status(400).send({message : "Requête invalide"})

    const emailPattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailPattern.test(email))
        return res.status(400).send({message : "Requête invalide"})

    const code = await Code.findOne({value : input, expiration : {$gt : Date.now()}, isUsed : false}).populate('User')

    if(!code)
        return res.status(404).send({message : "Code introuvable"})

    const expirationDate = new Date(code.expiration).toLocaleString('fr-FR', {timeZone : 'Europe/Paris'})

    if(expirationDate < Date.now())
        return res.status(401).send("Code expiré")

    const token = await Token.findOne({})

    try {
        if(token)
            return res.status(200).json({token})
        else {
            return res.status(404).send({message : "Token introuvable"})
        }
    }

    catch(e) {
        return res.status(500).json({message : "Une erreur est surevenue"})
    }
})

module.exports = router