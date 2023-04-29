const express = require('express')
global.dotenv = require('dotenv').config()
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

const authMiddleware = (req, res, next) => {
    console.log(req.headers);
}

app.get('/user', authMiddleware, async (req, res) => {
    const users = await User.find({}).populate('status')
    res.send(users)
})

db.connect();

createRole();
createStatus();

const insertUser = async (user) => {
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
