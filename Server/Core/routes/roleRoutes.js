const express = require("express");
const Role = require("../database/schemas/Role");

const router = express.Router();

router.get("/api/roles", async (req, res) => {
    const roles = await Role.find({})
    res.status(200).send(roles)
})

module.exports = router;