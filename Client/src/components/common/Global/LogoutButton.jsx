"use client"

import {useSession, signOut } from "next-auth/react";

const LogoutButton = (props) => {

    const handleClick = () => {
        signOut();
    }

    return  <button onClick={handleClick} >
                <h3 {...props}>Déconnexion</h3>
            </button>
}

export default LogoutButton;