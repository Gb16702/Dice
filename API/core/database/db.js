const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()

module.exports = () => {
    mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connecté avec succès à mongoDB');
    })
    .catch(err => console.error(err));
}