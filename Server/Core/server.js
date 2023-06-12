const express = require('express')
const path = require('path')
global.dotenv = require('dotenv').config({path : path.join(__dirname, "../../.env")})
const db = require('./database/db')
const createRole = require('./utils/createRole')
const createUser = require('./utils/createUser')
const createStatus = require('./utils/createStatus')
const createAdminToken = require('./utils/createAdminToken')

const Status = require('./database/schemas/Status')
const User = require('./database/schemas/User')

const userRoute = require('./routes/userRoutes')
const roleRoute = require('./routes/roleRoutes')
const authRoute = require('./routes/authRoutes')
const adminRoute = require('./routes/adminRoutes')

const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

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

app.use(express.json());
app.use(userRoute);
app.use(roleRoute);
app.use(authRoute);
app.use(adminRoute);

db.connect();

createRole();
createStatus();
createAdminToken();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port' + process.env.PORT);
})