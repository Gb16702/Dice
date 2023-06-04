"use client";

import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import generateSecurePassword from "@/src/lib/generateSecurePassword";
import { resolver } from "@/src/lib/resolver";
import Locker from "../Icons/HeroIcons/Locker";
import {useEffect, useState} from "react"
import { ClosedEye, OpenEye } from "../Icons/HeroIcons/Eyes";

const InscriptionForm = () => {
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm({resolver});
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false)
    const [focused, setFocused] = useState(false)

    const onSubmit = async data => {
        try {
                setLoading(true)
                const response = await fetch("http://localhost:8000/api/users", {
                        method: "POST",
                        headers : {
                                "Content-Type" : "application/json"
                        },

                        body : JSON.stringify(data)
                })
                console.log(data);

                if(response.ok)
                        console.log("Utilisateur créé avec succès");
                else
                        console.log("Une erreur est survenue");
        }

        catch(e) {
                console.log(e.response.data.message);
        }

        finally {
                setTimeout(() => {
                        setLoading(false)
                })
        }
    }

    const passwordValue = watch("password", "")

    useEffect(() => {
        if (passwordValue.length > 0) {
          setFocused(true);
        } else {
          setFocused(false);
        }
      }, [passwordValue]);

    const handleClick = () => {
        const password = generateSecurePassword(12);
        setValue("password", password);
        setValue("confirmPassword", password)
    }

    return  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input className="bg-white border border-[#c2c8d0] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder="Nom d'utilisateur"
                    {...register("username")}
            />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
            <Input className="bg-white border border-[#c2c8d0] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder = "Adresse mail"
                    {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className="bg-white border border-[#c2c8d0] w-full h-[50px] gap-4 flex items-center text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200"
        placeholder="Mot de passe"
        {...register("password")}
      />
      <Locker
        onClick={handleClick}
        className={`h-[19px] w-[19px] ${focused ? "text-vprimary" : "text-[#c2c8d0]"} cursor-pointer absolute top-[49%] -translate-y-1/2 right-[7px] transition duration-200`}
      />
      {visible ? (
        <ClosedEye
          className={`h-[22px] w-[22px] ${
            focused ? "text-vprimary" : "text-[#c2c8d0]"
          } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200`}
          onClick={() => setVisible(!visible)}
        />
      ) : (
        <OpenEye
          className={`h-[22px] w-[22px] ${
            focused ? "text-vprimary" : "text-[#c2c8d0]"
          } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200`}
          onClick={() => setVisible(!visible)}
        />
      )}
    </div>
                {errors.password && <p className="text-red-500">{errors.password}</p>}

            <Input type={visible ? "text" : "password"} className="bg-white border border-[#c2c8d0]  w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200" placeholder = "Confirmer le mot de passe"
                    {...register("confirmPassword")}
            />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
            <Button className = "bg-vtertiary text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-sm">
                {loading ? "Inscription en cours..." : "S'inscrire"}
            </Button>

            </form>
}

export default InscriptionForm;