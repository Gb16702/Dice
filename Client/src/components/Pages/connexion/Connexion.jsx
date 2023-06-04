"use client";

import Button from "@/src/components/common/Global/Button"

import {useSession} from "next-auth/react";

import ConnexionForm from "../../common/Global/Forms/ConnexionForm";
import Link from "next/link";
import ProvidersButtonsBloc from "../../common/Global/ProvidersButtonBloc";
import LogoutButton from "../../common/Global/LogoutButton";

const Connexion = () => {

    const {data:session} = useSession();
    console.log(session?.user);

    return <section className="h-[100vh] flex items-center justify-center bg-white relative">
        <div className="flex items-center justify-center flex-col w-[1000px]">
            <div className="w-[330px] flex items-center flex-col">
            <h1 className="font-semibold text-[26px] py-[5px] text-center text-zinc-900/[.80] pb-[30px]">Connecte-toi</h1>

            <ConnexionForm />

            <h3 className="mt-3">Pas encore de compte ? <Link href = "/inscription" className="text-[#603AD9]">Inscris-toi</Link></h3>

            <div className="w-full flex flex-row items-center justify-center border-none text-xs font-medium py-6 after:border-b-2 before:border-b-2 before:w-[100%] before:mr-4 after:w-[100%] after:ml-4">
                <span className="text-center flex-1/5 mx-0 uppercase">ou</span>
            </div>


            <ProvidersButtonsBloc />
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
            |
            <LogoutButton />
        </div>
    </section>
}

export default Connexion;