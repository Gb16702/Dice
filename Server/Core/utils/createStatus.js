const Status = require('../database/schemas/Status');

module.exports = async () => {
    const status = new Set([
        {state : "En ligne", default : true},
        {state : "Hors ligne", default : false},
        {state : "Inactif", default : false}
    ])

    try {
        for (const statusData of status) {
            const isExistingStatus = await Status.findOne({state : statusData.state});
            if(isExistingStatus) continue;
            const newStatus = new Status({state : statusData.state, default : statusData.default});
            await newStatus.save();
        }
    }
    catch(e) {
        console.error(`Erreur lors de la création des status : ${e}`);
    }
}