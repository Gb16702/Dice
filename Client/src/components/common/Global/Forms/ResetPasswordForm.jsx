"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"
import Input from "../Input";

const ResetPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const {register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    const {passwordToken} = session?.user, token = passwordToken, {email, password, newPassword} = data;
    if(!password || !newPassword)
    return

    setIsSubmitted(true)

    const response = await fetch(`http://localhost:8000/api/users/${session?.user?.id}/reset-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, newPassword, token})
    })

    await response.json()
    if(response.ok) {
        setSuccess(true)
        router.replace("/")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4 mb-6">
      <div>
        <label className="text-zinc-500 font-medium text-md">
          Nouveau mot de passe
        </label>
        <Input
          type="password"
          className="bg-white border border-[#dbdcde] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200"
          placeholder="Entre ton nouveau mot de passe"
          {...register("newPassword", { required: true })}
        />
      </div>
      <div>
        <label className="text-zinc-500 font-medium text-md">
          Mot de passe actuel
        </label>

        <Input
          type="password"
          className="bg-white border border-[#dbdcde] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-[5px] font-normal text-black focus:border-vtertiary focus:text-vtertiary transition duration-200"
          placeholder="Entre ton mot de passe actuel"
          {...register("password", { required: true })}
        />
      </div>

      <button
        className="bg-vsecondary text-white font-semibold h-[50px] rounded-md transition duration-200 hover:bg-vtertiary"
        onClick={() => setIsSubmitted(true)}
      >
        {isSubmitted ? (success ? "Succès !" : "Erreur") : "Valider"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
