const express = require("express")
const router = express.Router()
const Category = require("../database/schemas/Category")
const slugger = require("../utils/slugger")
const multer = require("multer");
const upload = multer()
const {normalize} = require("path")
const cloudinary = require("cloudinary").v2;
const cloudConfig = require("../utils/cloudConfig");
const checkUpload = require("../utils/checkUpload");

router.get("/api/categories", async (req, res) => {
    if(req.method !== "GET"){
        return res.status(405).send({message : "Méthode non autorisée"})
    }

    const categories = await Category.find({})

    if(!categories) {
        return res.status(404).send({message : "Aucune catégorie trouvée"})
    }

    return res.status(200).send({categories})
})

router.post("/api/categories", upload.none(), async (req, res) => {
    if(req.method !== "POST") {
        return res.status(405).send({message : "Méthode non autorisée"})
    }

    console.log(req.body.upload_preset);
    const {data, category, description} = req.body;

    if(!data || !category || !description) {
        return res.status(400).send({message : "Requête invalide"})
    }

    const {error} = checkUpload(data)

    if(error) {
        return res.status(400).send({message : error})
    }

    try {

    const isExistingCategory = await Category.findOne({
        name : category
    })

    if(isExistingCategory) {
        return res.status(409).send({message : "Cette catégorie existe déjà"})
    }

    cloudinary.config(cloudConfig)
        const uploadedResponse = await cloudinary.uploader.upload(req.body.data, {
            upload_preset : req.body.upload_preset,
        })
        await Category.create({
            name : category,
            slug : slugger(category),
            description : description.trim(),
            image : uploadedResponse.secure_url
        })
        return res.status(201).send({message : "Catégorie crée avec succès"})
    }
    catch(e) {
        console.log(e);
    }
})

module.exports = router