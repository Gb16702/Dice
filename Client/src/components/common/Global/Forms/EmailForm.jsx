"use client"

import { useState, useEffect } from "react";
import {useSession} from "next-auth/react"

const EmailForm = () => {
    const { data: session, update} = useSession()
    const [isClicked, setIsClicked] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/api/users/${session?.user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: session?.user?.email})
        })
        const {token} = await response.json()

        if(response.ok && token) {
            await update({
                ...session,
                user : {
                    ...session.user,
                    "emailToken" : token,
                }
            })
        }
    }

    return  <form onSubmit={handleSubmit}>
                <button onClick={() => setIsClicked(true)} className="text-zinc-500 font-medium text-md underline">{isClicked ? "Email envoyé !" : "Envoyer un mail de vérification"}</button>
            </form>
}

export default EmailForm