const Role = require("../database/schemas/Role")

module.exports = async () => {
    const roles = new Set([
        {name : "Fondateur", default : false},
        {name : "Administrateur", default : false},
        {name : "Rédacteur", default : false},
        {name : "Contributeur", default : false},
        {name : "Lecteur", default : true},
    ])

    try {
        for(const roleData of roles) {
            const isExistingRole = await Role.findOne({name : roleData.name})
            if(isExistingRole) continue
            const newRole = new Role({ name: roleData.name, default: roleData.default })
            await newRole.save()
        }
    }
    catch (e) {
        console.error(`Erreur lors de la création des roles : ${e}`);
    }
}
