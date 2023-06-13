"use client";

import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import generateSecurePassword from "@/src/lib/generateSecurePassword";
import Locker from "../Icons/HeroIcons/Locker";
import { useEffect, useState, useRef } from "react"
import { ClosedEye, OpenEye } from "../Icons/HeroIcons/Eyes";
import { useRouter } from "next/navigation";
import resolver from "@/src/lib/resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const InscriptionForm = () => {

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm({
    resolver : yupResolver(resolver),
  });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const onSubmit = async data => {
    console.log(data);
    await resolver.validate(data)

    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        toast.custom(<Toast message="Vous vous êtes inscrit à Dice !" variant = "success" type="Succès" />)
        router.push("/connexion");
      }

      else {
        toast.custom(<Toast message="Une erreur est survenue" variant = "error" type="Erreur" />)
      }
    }

    catch(e) {
      console.log(e);
    }
  }

  const passwordValue = watch("password", "")
  const confirmPasswordValue = watch("confirmPassword", "")

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

  const passwordWatch = watch("password", "")
  const confirmPasswordWatch = watch("confirmPassword", "")

  return <form onSubmit={handleSubmit(onSubmit)} className="w-full">
    {errors.username ?
      <Input variant="error" placeholder="Nom d'utilisateur" {...register("username")} /> : (
      <Input variant="loginForm" placeholder="Nom d'utilisateur" {...register("username")} />
    )}
    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
    {errors.email ?
      <Input type="email" variant="error" placeholder="Adresse mail" {...register("email")} /> : (
      <Input type="email" variant="loginForm" placeholder="Adresse mail"
      {...register("email")}
    />
      )}
    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

    <div className="relative">
      {errors.password ?
      <>
      <Input type={visible ? "text" : "password"} variant="error" placeholder="Mot de passe"
      onFocus={() => setFocused(true)} onBlur = {() => setFocused(false)}
      {...register("password")} />
      <Locker
        onClick={handleClick}
        className={`h-[19px] w-[19px] ${focused ? "text-red-400" : "text-[#c2c8d0]"} cursor-pointer absolute top-[49%] -translate-y-1/2 right-[7px] transition duration-200`}
      />
       {visible ? (
        <ClosedEye
          className={`h-[22px] w-[22px] ${focused ? "text-red-400" : "text-[#c2c8d0]"
            } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200`}
          onClick={() => setVisible(!visible)}
        />
      ) : (
        <OpenEye
          className={`h-[22px] w-[22px] ${focused ? "text-red-400" : "text-[#c2c8d0]"
            } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200`}
          onClick={() => setVisible(!visible)} onChange={() => trigger("password", "confirmPassword")}
        />
      )}
      </>
        :
        <>
      <Input type={visible ? "text" : "password"} variant="loginForm" placeholder="Mot de passe"
      onFocus={() => setFocused(true)} onBlur = {() => setFocused(false)}
      {...register("password")} />
      <Locker
        onClick={handleClick}
        className={`h-[19px] w-[19px] ${focused ? "text-vprimary" : "text-[#c2c8d0]"} cursor-pointer absolute top-[49%] -translate-y-1/2 right-[7px] transition duration-200`}
      />
       {visible ? (
        <ClosedEye
          className={`h-[22px] w-[22px] ${focused ? "text-vprimary" : "text-[#c2c8d0]"
            } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200`}
          onClick={() => setVisible(!visible)}
        />
      ) : (
        <OpenEye
          className={`h-[22px] w-[22px] ${focused ? "text-vprimary" : "text-[#c2c8d0]"
            } cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200`}
          onClick={() => setVisible(!visible)} onChange={() => trigger("password", "confirmPassword")}
        />
      )}
      </>
      }

    </div>
    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

    {errors.confirmPassword ?
      <Input type={visible ? "text" : "password"} variant="error" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} />
      :
      <Input type={visible ? "text" : "password"} variant="loginForm" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} />
    }
    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
    {Object.keys(errors).length > 0 ? (
      <Button variant="error">
        {loading ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    ) : (
      <Button className="bg-vtertiary text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px]"
      >
      {loading ? "Inscription en cours..." : "S'inscrire"}
    </Button>
      )}

  </form>
}

export default InscriptionForm;