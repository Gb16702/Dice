"use client";

import {useSession} from "next-auth/react";
import ConnexionForm from "../../common/Global/Forms/ConnexionForm";
import Link from "next/link";
import {ProvidersButtonsBloc, ProvidersButtonsBlocSecondary} from "../../common/Global/ProvidersButtonBloc";
import { FormEnglober } from "../../common/Global/FormEnglober";
import FormBottom from "../../common/Global/FormBottom";

const Connexion = () => {

    const {data:session} = useSession();
    console.log(session?.user);

    return <section className="h-[100vh] flex items-center justify-center bg-gradient-to-b from-[#F7F7F7] to-[#EEE] flex-col">
        <div className="flex items-center justify-center flex-col w-[1000px]">
            <div className="w-[330px] flex items-center flex-col">
            <FormEnglober>
            <h1 className="font-semibold text-[26px] py-[5px] text-center text-zinc-900/[.80] pb-[30px]">Connecte-toi</h1>
            <ConnexionForm />
            <div className="w-full flex flex-row items-center justify-center border-none text-xs font-medium py-6 after:border-b-2 before:border-b-2 before:w-[100%] before:mr-4 after:w-[100%] after:ml-4">
                <span className="text-center flex-1/5 mx-0 uppercase">ou</span>
            </div>
            <ProvidersButtonsBlocSecondary />
            <h3 className="mt-7 text-zinc-500">Nouveau sur Dice ?
                <Link href = "/inscription" className="text-[#603AD9]"> Inscris-toi</Link>
            </h3>
            </FormEnglober>
            </div>
        </div>
        <FormBottom />
    </section>
}

export default Connexion;