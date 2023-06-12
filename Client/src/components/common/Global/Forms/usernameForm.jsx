"use client"

import { useSession } from "next-auth/react"
import {useForm} from "react-hook-form"
import Input from "../Input";
import { use, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UsernameForm = () => {

    const { data: session, update } = useSession();
    const router = useRouter();

    console.log(session);

    const [value, setValue] = useState(session?.user?.username);
    const [isDirty, setIsDirty] = useState(false);

    const handleChange = e => {
        setValue(e.target.value)
        if(e.target.value !== session?.user?.username)
            setIsDirty(true);
        else
            setIsDirty(false);
    }

    useEffect(() => {
        console.log(value);
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/api/users/${session?.user?.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: value})
        })

        await response.json()
        console.log(response);

        if(response.ok) {
            console.log(response);
            if(session) {
                await update({
                    ...session,
                    user : {
                        ...session.user,
                        "username" : value
                    }
                })
                router.refresh()
            }


        }else {
            console.log(response);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
                        <h3 className="text-zinc-500">Nom d'utilidsateur</h3>
                        <Input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300 placeholder-zinc-400/[.8] transition duration-200" defaultValue={session?.user?.username} onChange={handleChange}
                        />
                        {isDirty && <button>Appliquer les modifications</button>}
        </form>
    )
}

export default UsernameForm;