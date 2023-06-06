"use client"

import Link from "next/link"

const error = ({error, reset}) => {
    return (
        <main className="h-[100vh] bg-white">
            <div className="h-[68vh] bg-zinc-900 w-full top-0">
                <div className="flex items-center justify-center flex-col h-full">
                <p className="text-[19px] font-medium text-vprimary">
                    Une erreur est survenue
                </p>
                <h1 className="mt-4 text-[40px] font-bold tracking-tight text-zinc-100">
                    {error.message ?? "Quelque chose s'est mal passé"}
                </h1>
                <p className="mt-6 text-[19px] leading-7 text-zinc-400">
                    Réessaye plus tard ou contacte le support si le problème persiste
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button onClick={reset} className="text-vprimary w-[160px] h-11 px-5 rounded-md border border-vprimary bg-vprimary/[.16] ">Réessayer</button>
                    <Link href="/" className="border border-zinc-300 text-zinc-300 rounded-md w-[160px] h-11 flex items-center justify-center text-center ">
                        Aller à l'accueil
                    </Link>
                </div>
            </div>
            </div>
        </main>
    )
}

export default error