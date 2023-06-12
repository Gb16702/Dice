"use client"

import { useState, useEffect } from "react"
import ModalBox from "./ModalBox"
import { Close } from "./Icons/HeroIcons/Close"
import Input from "./Input"
import Button from "./Button"
import { ClosedEye, OpenEye } from "./Icons/HeroIcons/Eyes"
import { useSession, signOut } from "next-auth/react"
import {useRouter} from "next/navigation"

const DeleteAccount = () => {

  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState(null);

  const handleResponse = response => {
    if(response.ok) {
      console.log(response);
      router.refresh()
      signOut()
    }
    else
      console.log(response.error.message);
  }

  const handleClick = () => {
    setIsOpen(true);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/users/${session?.user?.id}`, {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({password}),
      credentials : "include"
    })

    await response.json()
    if(response.ok) {
      handleResponse(response)
      
    }
    else {
      console.log(response.error.message);
    }
  }

  const handleChange = e => {
    setPassword(e.target.value)
    console.log(password);
  }

  return (
    <>
      <div className="mt-10 border-t border-zinc-200">
        <h2 className="mt-4 text-lg text-zinc-900 font-semibold">
          Supprimer ton compte
        </h2>
        <h3 className="text-zinc-500 font-medium text-md">En cliquant <span className="text-red-400 cursor-pointer" onClick={handleClick}>ici</span>, tu peux procéder à la supression de ton compte. Toutes tes données seront effacées</h3>
      </div>
      {isOpen && (
        <ModalBox>
          <div className="justify-between items-center flex">
            <h3 className="text-zinc-950 font-medium text-[20px] tracking-tight">
              Suppression de compte
            </h3>
            <Close className="text-xl cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <h4 className="mt-1 text-sm text-zinc-500/[.8]">
            Es-tu sûr de vouloir supprimer ton compte ?<br />
          </h4>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="relative">

              <Input type={visible ? "text" : "password"} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300 placeholder-zinc-400/[.8] transition duration-200" placeholder="Entre ton mot de passe" onChange={handleChange}
              />
              {visible ? (
                <ClosedEye
                  className="h-[22px] w-[22px] cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <OpenEye
                  className="h-[22px] w-[22px] cursor-pointer absolute top-1/2 -translate-y-1/2 right-[35px] transition duration-200"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
            <Button className={`w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 text-white ${password &&
              password.length > 0 ? "bg-red-400" : "bg-red-400/[.3]"
              }`}
            >
              Supprimer mon compte
            </Button>
          </form>
        </ModalBox>
      )}
    </>
  )
}

export default DeleteAccount;