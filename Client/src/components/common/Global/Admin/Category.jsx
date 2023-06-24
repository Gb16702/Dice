"use client";

import { getPathname } from "@/src/lib/getPathname"

const Category = () => {

    let category;
    if(getPathname() === "dashboard") {
        category = "Derniers utilisateurs inscrits"
    }
    if(getPathname() === "utilisateurs") {
        category = "Tous les utilisateurs inscrits"
    }
    if(getPathname() === "roles") {
        category = "Tous les rôles"
    }
    if(getPathname() === "status") {
        category = "Tous les statuts"
    }

    return  <h3 className="text-zinc-100 text-[18px] tracking-tight ">
                {category}
            </h3>
}

export default Category