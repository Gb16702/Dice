const writeHead = () => {
    const dirname = __dirname.split("\\");
    const lastIndex = dirname.length - 1;
    const value = dirname[lastIndex];

    let head = [];

    if(value == "categories") {
        head = ["Catégorie", "Slug", "Description", "Créé il y a", "Actions"]
    }
    else if (value == "tags") {
        head = ["Tag", "Slug", "Créé il y a", "Actions"]
    }
    else if (value == "status") {
        head = ["Statut", "Slug", "Créé il y a", "Actions"]
    }
    else if (value == "roles") {
        head = ["Rôle", "Grade", "Créé il y a", "Actions"]
    }
    else if (value == "utilisateurs") {
        head = ["Utilisateur", "Email", "Créé il y a", "Actions"]
    }
    return head;
}

export default writeHead;