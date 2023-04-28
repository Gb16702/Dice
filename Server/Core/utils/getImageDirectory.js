const fs = require('fs')
const path = require('path')

const getImageDirectory = () => {
    let defaultAvatars = new Set();

    const directory = path.join(__dirname, "../../public/images")

    fs.readdirSync(directory).forEach(file => {
        defaultAvatars.add(file)
    })

    return defaultAvatars;
}

module.exports = getImageDirectory;
