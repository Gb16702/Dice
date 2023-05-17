const express = require('express')
const path = require('path')
global.dotenv = require('dotenv').config({path : path.join(__dirname, "../../.env")})
const db = require('./database/db')
const createRole = require('./utils/createRole')
const createUser = require('./utils/createUser')
const createStatus = require('./utils/createStatus')
const Status = require('./database/schemas/Status')
const User = require('./database/schemas/User')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/user', async (req, res) => {
    const users = await User.find({}).populate('status')
    res.send(users)
})

app.get('/user/:id', async (req, res) => {
    const matchedUser = await User.findOne({_id : req.params.id})
    if(!matchedUser) return res.status(404).send("Utilisateur introuvable")
    res.send(matchedUser)
})

db.connect();

createRole();
createStatus();

const insertUser = async () => {
    const onlineStatus = await Status.findOne({state : "En ligne"})

    for (let i = 0; i < 2; i++) {
        createUser({
            username : "Test" + i,
            email : "Test" + i + "@gmail.com",
            password : "Test1234",
            role : "Lecteur",
            avatar : "Test",
            status : onlineStatus._id,
            bio : "Je suis un test"
        })
    }
}

insertUser();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port' + process.env.PORT);
})
