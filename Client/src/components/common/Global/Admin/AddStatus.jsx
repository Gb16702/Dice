"use client"

import { useState } from "react"
import Add from "../Icons/HeroIcons/admin/Add"
import { Close } from "../Icons/HeroIcons/Close"
import Button from "../Button"
import { toast } from "react-hot-toast"
import Toast from "../Toast"
import { useRouter } from "next/navigation"

const AddStatus = () => {

    const [isModalOpen, setIsModalOpen] = useState(false),
    [loading, setLoading] = useState(false),
    [value, setValue] = useState("")

    const router = useRouter()

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {

        const response = await fetch(`http://localhost:8000/api/status`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                state : value
            })
        })
        if(!response.ok) {
            setLoading(false)
            toast.custom(<Toast message="Une erreur est survenue !" variant = "error" type="Erreur" />)
            return
        }else {
            const {message} = await response.json()
            toast.custom(<Toast message={message} variant = "success" type="Succès" dark />)
            setLoading(false)
            setIsModalOpen(false)
            router.refresh()
        }
        }
        catch(e) {
            setLoading(false)
        }
    }

    return (
        <>
            {isModalOpen && (
                <>
                <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5] "></div>
            <div className="fixed z-20 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800">
            <div className="justify-between items-center flex">
            <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
              Ajouter un statut
            </h3>
            <Close className="text-xl cursor-pointer fill-zinc-100" onClick={() =>setIsModalOpen(false)} />
          </div>
          <form  className="mt-7 flex flex-col gap-y" onSubmit={handleSubmit}>
            <input type="text"
            placeholder="Nom du statut"
            className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200"
            onChange={e => setValue(e.target.value)}
            />
            <Button className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
            >
                Ajouter le statut
            </Button>
          </form>
          </div>
                </>
            )}

            <button onClick={handleClick} >
                <Add className="w-9 h-9 p-[6px] stroke-zinc-300 rounded-md bg-zinc-800" />
            </button>
        </>
    )


}
export default AddStatus