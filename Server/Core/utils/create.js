const Role = require("../database/schemas/Role")

const create = async () => {
    const roles = new Set([
        "SuperAdmin",
        "Administrateur",
        "Rédacteur",
        "Contributeur",
        "Lecteur",
        "Invité"
    ])

    try {
        for(const roleName of roles) {
            const isExistingRole = await Role.findOne({name : roleName})
            if(isExistingRole) continue
            const newRole = new Role({ name: roleName })
            await newRole.save()
        }
    }
    catch (e) {
        console.error(`Erreur lors de la création des roles : ${e}`);
    }
}

module.exports = create