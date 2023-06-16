"use client";

import { FormEnglober } from "../FormEnglober"
import {useForm} from "react-hook-form"
import Input from "../Input"
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"
import {useState} from "react"
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const ResetEmail = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {data: session} = useSession();
    const router = useRouter();

    console.log(session);

    const onSubmit = async data => {
        const {emailToken} = session?.user, token = emailToken, {email, password} = data;
        if(!password)
        return

        setIsSubmitted(true)

        const response = await fetch(`http://localhost:8000/api/users/${session?.user?.id}/reset-email`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password, token})
        })

        if(!response.ok) {
            toast.custom(<Toast message={"Une erreur est survenue"} variant = "error" type="Erreur" />)
        }else{
            await response.json()
            setSuccess(true)
            toast.custom(<Toast message={`Ton adresse mail a correctement été modifiée`} variant = "success" type="Succès" />)
            router.replace("/")
        }
    }

    return  <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4 mb-6">
                <div>
                <label className="text-zinc-500 font-medium text-md">Nouvelle adresse mail</label>
                <Input type="email"
                className="bg-white border border-[#dbdcde] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder="Entre ta nouvelle adresse mail"
                {...register("email")}
                />
                </div>

                <div>
                <label className="text-zinc-500 font-medium text-md">Mot de passe</label>
                <Input type="password"
                className="bg-white border border-[#dbdcde] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder="Entre ton mot de passe"
                {...register("password", {required: true})}
                />
                </div>

                <button className="bg-vsecondary text-white font-semibold h-[50px] rounded-md transition duration-200 hover:bg-vtertiary" onClick = {() => setIsSubmitted(true)}>{isSubmitted ? success ? "Succès !" : "Erreur"  : "Valider"}</button>
            </form>
}

export default ResetEmail