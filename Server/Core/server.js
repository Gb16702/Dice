const express = require('express')
const path = require('path')
global.dotenv = require('dotenv').config({path : path.join(__dirname, "../../.env")})
const db = require('./database/db')

const   createRole = require('./utils/createRole'),
        createStatus = require('./utils/createStatus'),
        createAdminToken = require('./utils/createAdminToken');

const   User = require('./database/schemas/User');

const   userRoute = require('./routes/userRoutes'),
        roleRoute = require('./routes/roleRoutes'),
        authRoute = require('./routes/authRoutes'),
        adminRoute = require('./routes/adminRoutes'),
        statusRoute = require('./routes/statusRoutes');

const   cors = require('cors'),
        cookieParser = require("cookie-parser");

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

app.get('/user/:id', async (req, res) => {
    const matchedUser = await User.findOne({_id : req.params.id})
    if(!matchedUser) return res.status(404).send("Utilisateur introuvable")
    res.send(matchedUser)
})

app.use(express.json(), userRoute, roleRoute, authRoute, adminRoute, statusRoute);
db.connect();

createRole(); createStatus(); createAdminToken();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port' + process.env.PORT);
})