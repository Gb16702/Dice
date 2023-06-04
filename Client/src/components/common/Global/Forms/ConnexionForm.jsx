"use client";

import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import ConnectButton from "../ConnectButton";
import { signIn } from "next-auth/react";
import {useState, useEffect} from "react";
import { ClosedEye, OpenEye } from "../Icons/HeroIcons/Eyes";
import { emailPattern as pattern } from "@/src/lib/emailPattern";

const ConnexionForm = () => {

    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data);
        const url = "http://localhost:3000/";
        try {
            setLoading(true)
            const response = await signIn("credentials", {
                redirect: true,
                email : data.email,
                password : data.password,
                callbackUrl : url
            })

            if(response?.error) {
                console.log(response);
            }
            else {
                console.log("OK");
            }
        }

        catch(e) {
            console.log(e);
        }

        finally {
            setTimeout(() => {
                setLoading(false)
            }, 250)
        }
    }

    const passwordValue = watch("password", "");

    useEffect(() => {
        if(passwordValue.length > 0) {
            setFocused(true)
        }else{
            setFocused(false)
        }
    }, [passwordValue])


    return <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input className="bg-white border border-[#c2c8d0] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-zinc-800 focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder = "Votre adresse mail"
            {...register("email", {
                required : {
                    value : true,
                    message : "Ce champs est requis"
                },
                pattern : {
                    value : pattern,
                    message : "Veuillez entrer une adresse mail valide"
                }
             })}
        />

        <div className="relative">
        <Input type={visible ? "text" : "password"} className="bg-white border border-[#c2c8d0] w-full h-[50px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 outline-none rounded-sm font-normal text-zinc-800 text-base focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder = "Votre mot de passe"
            {...register("password", { required: true })}
            />
             {visible ? (
                   <ClosedEye className={`h-[22px] w-[22px] ${focused ? "text-vprimary" : "text-[#c2c8d0]"} cursor-pointer absolute top-1/2 -translate-y-1/2 right-[20px] transition duration-200`} onClick={() => setVisible(!visible)} />
                ) : (
                   <OpenEye className={`h-[22px] w-[22px] ${focused ? "text-vprimary" : "text-[#c2c8d0]"} cursor-pointer absolute top-1/2 -translate-y-1/2 right-[20px] transition duration-200`} onClick={() => setVisible(!visible)} />
                )}
        </div>
        <ConnectButton>
            {loading ? "Connexion en cours" : "Se connecter"}
        </ConnectButton>
    </form>
}

export default ConnexionForm;