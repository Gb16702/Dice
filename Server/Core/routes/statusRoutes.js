const express = require('express');
const Status = require('../database/schemas/Status');
const router = express.Router()

router.get("/api/status", async (req, res) => {
    if(req.method !== "GET")
        return res.status(405).send({message : "Méthode non autorisée"})

    const status = await Status.find({})
    if(!status)
        return res.status(404).send({message : "Aucun statut trouvé"})
    else
        return res.status(200).send({status})

})

router.post("/api/status", async (req, res) => {
    if(req.method !== "POST")
        return res.status(405).send({message : "Méthode non autorisée"})
    const {state} = req.body
    if(!state)
        return res.status(400).send({message : "Requête invalide"})
    else {
        await Status.create({
            state,
            slug : state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-"),
            default : false
        })
        return res.status(201).send({message : `Status créé avec succès !`})
    }
})

router.delete("/api/status", async (req, res) => {
    if(req.method !== "DELETE")
        return res.status(405).send({message : "Méthode non autorisée"})

    const {state} = req.body
    if(!state)
        return res.status(400).send({message : "Requête invalide"})
    else {
        const status = await Status.find({state})
         if(!status)
            return res.status(404).send({message : "Statut introuvable"})
        else {
            if(status.length > 1) {
                await Status.deleteMany({_id : {$in : status.map(s => s._id)}})
                return res.status(200).send({message : `Statuts supprimés avec succès !`})
            }else{
                await Status.findOneAndDelete({_id : status[0]._id})
                return res.status(200).send({message : `Statut supprimé avec succès !`})
            }
        }
    }
})

module.exports = router
