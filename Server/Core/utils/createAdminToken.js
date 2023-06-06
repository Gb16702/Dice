const Token = require("../database/schemas/Token")
const jwt = require("jsonwebtoken")
const path = require("path")
const dotenv = require("dotenv").config({path : path.join(__dirname, "../../../.env")})
const bcrypt = require("bcrypt")

module.exports = async () => {
    const tokenId = Math.random().toString(36).substring(2, 15)
    const token = jwt.sign({tokenId}, process.env.NEXTAUTH_SECRET, {expiresIn : "6H"})

    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 6)

    await Token.create({token, expiration})

    return token
}