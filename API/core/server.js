const express = require('express')
global.dotenv = require('dotenv').config()
const dbInit = require('./database/db')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World');
})

dbInit()

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 8000');
})