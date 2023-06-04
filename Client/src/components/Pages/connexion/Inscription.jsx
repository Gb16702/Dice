"use client";

import InscriptionForm from "../../common/Global/Forms/InscriptionForm"
import Link from "next/link";
import ProvidersButtonsBloc from "../../common/Global/ProvidersButtonBloc";

const Inscription = () => {

    return  <section className="h-[100vh] flex items-center justify-center bg-white relative">
                <div className="flex items-center justify-center flex-col w-[1000px]">
                    <div className="w-[330px] flex items-center flex-col">
                        <h1 className="font-semibold text-[26px] py-[5px] text-zinc-900/[.80] pb-[30px]">Inscris-toi</h1>
                        <InscriptionForm />
                        <h3 className="mt-3">Déjà un compte ? <Link href = "/connexion" className="text-[#603AD9]">Connecte-toi</Link></h3>
                        <div className="w-full flex flex-row items-center justify-center border-none text-xs font-medium py-6 after:border-b-2 before:border-b-2 before:w-[100%] before:mr-4 after:w-[100%] after:ml-4">
                <span className="text-center flex-1/5 mx-0 uppercase">ou</span>
            </div>
            <ProvidersButtonsBloc />
                    </div>
                </div>
            </section>
}

export default Inscription