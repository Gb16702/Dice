const express = require('express')
const path = require('path')
global.dotenv = require('dotenv').config({path : path.join(__dirname, "../../.env")})
const db = require('./database/db')

const   userRoute = require('./routes/userRoutes'),
        roleRoute = require('./routes/roleRoutes'),
        authRoute = require('./routes/authRoutes'),
        adminRoute = require('./routes/adminRoutes'),
        statusRoute = require('./routes/statusRoutes'),
        tagsRoute = require('./routes/tagsRoutes'),
        categoryRoute = require('./routes/categoriesRoutes'),
        articlesRoute = require('./routes/articlesRoute');


const   cors = require('cors'),
        cookieParser = require("cookie-parser"),
        bodyParser = require("body-parser");

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
.use(cookieParser())
.use(express.json({ limit: '50mb' }))
.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }))
.use(express.json(), userRoute, roleRoute, authRoute, adminRoute, statusRoute, tagsRoute, categoryRoute, articlesRoute);


db.connect();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port' + process.env.PORT);
})