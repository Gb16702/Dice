"use client"

import { useForm } from "react-hook-form";
import Input from "../Input";
import { emailPattern as pattern } from "@/src/lib/emailPattern";
import ConnectButton from "../ConnectButton";
import {redirect, useRouter} from "next/navigation"
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminConnexionForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();
    const { data: session, update} = useSession();
    console.log(session);

    const onSubmit = async (d, req) => {
        try {
            const response = await fetch("http://localhost:8000/api/admin", {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(d)
            })

            if(response.ok) {
                if(session) {
                    await update({
                        ...session,
                        user : {
                            ...session.user,
                            "adminToken" : d.token
                        }
                    });
                    router.push("/administration/dashboard");
                }
            }else{
                console.log("Une erreur est survenue");
            }
        }

        catch(e) {
            console.log(e);
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="w-full z-10">
        <Input className="bg-white border border-[#e0e0e2] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-slate-800 focus:border-slate-800 transition duration-200" placeholder="Entre ton adresse mail"
            {...register("email", {
                required: {
                    value: true,
                    message: "L'adresse mail est requise"
                },
                pattern: {
                    value: pattern,
                    message: "L'adresse mail est invalide"
                }
            })}
        />
        <Input className="bg-white border border-[#e0e0e2] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-slate-800 focus:border-slate-800  transition duration-200" placeholder="Entre ton mot de passe"
            {...register("password", {
                required : {
                    value : true,
                    message : "Ton mot de passe est requis"
                }
            })}
        />

        <Input className="bg-white border border-[#e0e0e2] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-slate-800 focus:border-slate-800 transition duration-200" placeholder="Entre le jeton d'accès"
            {...register("token", {
                required: {
                    value: true,
                    message: "Le jeton est requis"
                }
            })}
        />
        <ConnectButton variant="admin">Se connecter</ConnectButton>
        <Link href="/" className= "bg-white text-slate-800 border-slate-800 w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-md">
            Retourner à l'accueil
        </Link>
    </form>
}

export default AdminConnexionForm