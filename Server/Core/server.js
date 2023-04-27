const express = require('express')
global.dotenv = require('dotenv').config()
const dbInit = require('./database/db')
const create = require('./utils/create')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World');
})

dbInit()
create()

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 8000');
})