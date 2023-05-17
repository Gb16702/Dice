"use client";

import Button from "@/src/components/common/Global/Button"
import { signIn } from "next-auth/react"
import { useState } from "react";
import {useSession} from "next-auth/react";
import Google from "../../common/Global/Icons/BrandLogos/Google";
import Discord from "../../common/Global/Icons/BrandLogos/Discord";
import ConnexionForm from "../../common/Global/Forms/ConnexionForm";
import Link from "next/link";

const Connexion = () => {

    const [isLoadingGoogle, setIsLoadingGoogle]  = useState(false);
    const [isLoadingDiscord, setIsLoadingDiscord]  = useState(false);

    const loginWithGoogle = async () => {
        try  {
            setIsLoadingGoogle(true);
            await signIn("google")
        }
        catch(e) {
            console.error(e);
        }
    }

    const loginWithDiscord = async () => {
        try {
            setIsLoadingDiscord(true);
            await signIn("discord");
        }
        catch(e) {
            console.error(e);
        }
    }

    const {data:session} = useSession();
    console.log(session?.user);

    return <section className="h-[100vh] flex items-center justify-center bg-white relative">
        <div className="flex items-center justify-center flex-col w-[1000px]">
            <div className="w-[330px] flex items-center flex-col ">
            <h1 className="font-bold text-[26px] py-[5px] text-center pb-[30px]">Content de te revoir ! </h1>

            <ConnexionForm />

            <h3 className="mt-3">Pas encore de compte ? <span className="text-[#603AD9]">Inscris-toi</span></h3>

            <div className="w-full flex flex-row items-center justify-center border-none text-xs font-medium py-6 after:border-b-2 before:border-b-2 before:w-[100%] before:mr-4 after:w-[100%] after:ml-4">
                <span className="text-center flex-1/5 mx-0 uppercase">ou</span>
            </div>


            <Button className="bg-white border border-[#c2c8d0] text-white w-full h-[50px] gap-4 flex items-center  text-sm disabled:opacity-50 disabled:pointer-events-none px-3 rounded-sm mt-2 hover:bg-zinc-200/[.60] transition duration-200" onClick={loginWithGoogle}>
                <Google  />
                <h3 className="text-zinc-500 text-base font-normal">
                    {isLoadingGoogle ? "Connexion en cours..." : "Continuer avec Google"}
                </h3>
            </Button>
            <Button className="bg-white border border-[#c2c8d0] text-white w-full h-[50px] gap-4 flex items-center  text-sm  disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-sm hover:bg-zinc-200/[.60] transition duration-200" onClick={loginWithDiscord}>
                <Discord color = {"#5865F2"}  />
                <h3 className="text-zinc-500 text-base font-normal">
                    {isLoadingDiscord ? "Connexion en cours..." : "Continuer avec Discord"}
                </h3>
            </Button>
            </div>
        </div>
        <div className="absolute bottom-[30px] flex flex-row gap-3">
            <Link href = "/" className="text-vprimary">
                <h4>Notre politique</h4>
            </Link>
            <span className="text-[#c2c8d0]">
                |
            </span>
            <Link href = "/" className="text-vprimary">
                <h4>Nos conditions</h4>
            </Link>
        </div>
    </section>
}

export default Connexion;