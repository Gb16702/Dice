"use client"

import Button from "./Button";
import {useState} from "react";

const ConnectButton = () => {

        const [loading, setLoading] = useState(false)

        const handleClick = (e) => {
            setLoading(true)
            
        }
    return <Button className="bg-vtertiary text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-sm" onClick={handleClick}>
        {loading ? "Connexion en cours..." : "Se connecter"}
    </Button>
}

export default ConnectButton;