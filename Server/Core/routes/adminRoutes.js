const express = require('express');
const Token = require('../database/schemas/Token');
const User = require('../database/schemas/User');

const router = express.Router();

router.post("/api/admin", async (req, res) => {
    if(req.method !== "POST")
        return res.status(405).send("Méthode non autorisée")

    if(!req.body) {
        return res.status(400).send("Requête invalide")
    }

    const {email, password, token} = req.body

    if(!token || !email || !password)
     return res.status(400).send("Requête invalide")

    const user = await User.findOne({email})

    if(!user)
     return res.status(404).send("Utilisateur introuvable")

    if(!user.roles.equals("647f0bb2eee9a636224a411a")) {
        return res.status(403).send("Vous n'avez pas les droits pour accéder à cette ressource")
    }

    const jwt = await Token.findOne({token})

    if(jwt) {
        res.send(jwt.token)
    }else{
        return res.status(403).send("Jeton invalide")
    }
})

router.get("/api/admin/getUsers", async (req, res) => {
    const users = await User.find({}).select("-password")

    res.json(users)
})

module.exports = router;