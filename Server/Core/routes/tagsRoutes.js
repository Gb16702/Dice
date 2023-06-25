const express = require('express');
const Tag = require('../database/schemas/Tags');

const router = express.Router();

router.get("/api/tags", async (req, res) => {
    if(req.method !== "GET") {
        return res.status(405).send({message : "Méthode non autorisée"})
    }

    const tags = await Tag.find({})

    if(!tags) {
        return res.status(404).send({message : "Aucun tag trouvé"})
    }

    res.status(200).send({tags})
})

router.post("/api/tags", async (req, res) => {
    if(req.method !== "POST")
        return res.status(405).send({message : "Méthode non autorisée"})

    const {tag, color} = req.body

    if(!tag || !color)
        return res.status(400).send({message : "Requête invalide"})

    const isExistingTag = await Tag.findOne({
        name : tag
    })

    if(isExistingTag)
        return res.status(409).send({message : "Ce tag existe déjà"})

    await Tag.create({
        name : tag,
        slug : tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-"),
        color
    })

    return res.status(201).send({message : "Tag créé avec succès"})
})

module.exports = router