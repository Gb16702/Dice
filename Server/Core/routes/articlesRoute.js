const express = require("express")
const router = express.Router()
const cloudinary = require("cloudinary").v2;
const cloudConfig = require("../utils/cloudConfig");
const checkUpload = require("../utils/checkUpload");
const Article = require("../database/schemas/Article");
const slugger = require("../utils/slugger");
const Tags = require("../database/schemas/Tags");
const User = require("../database/schemas/User");

router.post("/api/articles", async (req, res) => {
    if(req.method !== "POST")
        return res.status(405).send({message : "Méthode non autorisée"})


    const {title, description, content, picture, author, tags} = req.body;

    if(!title || !description || !content || !picture || !author || !tags) {
        return res.status(400).send({message : "Requête invalide"})
    }

    const {error} = checkUpload(picture)

    if(error) {
        return res.status(400).send({message : error})
    }

    try {

        const tag = await Tags.find({name : {$in : tags}})
        console.log(tag);

        if(!tags)
            return res.status(404).send({message : "Aucun tag trouvé"})

        const isExistingArticle = await Article.findOne({
            name : title
        })

        const user = await User.findOne({_id : author})
        if(!user)
            return res.status(404).send({message : "Aucun utilisateur trouvé"})

        if(isExistingArticle) {
            return res.status(409).send({message : "Cette catégorie existe déjà"})
        }

        cloudinary.config(cloudConfig)
            const uploadedResponse = await cloudinary.uploader.upload(picture, {
                upload_preset : "dice-website",
            })
            await Article.create({
                title,
                slug : slugger(title),
                description,
                content,
                tags : tag.map(t => t._id),
                author : user._id,
                picture : uploadedResponse.secure_url,
            })
            return res.status(201).send({message : "Catégorie crée avec succès"})
    }
    catch(e) {
        console.log(e);
        return res.status(500).send({message : "Une erreur est survenue"})
    }
})

module.exports = router;