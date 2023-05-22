"use client";

import InscriptionForm from "../../common/Global/Forms/InscriptionForm"

const Inscription = () => {

    return  <section className="h-[100vh] flex items-center justify-center bg-white relative">
                <div className="flex items-center justify-center flex-col w-[1000px]">
                    <div className="w-[330px] flex items-center flex-col">
                        <h1 className="font-bold text-[26px] py-[5px] text-center pb-[30px]">Bienvenue ! </h1>
                            <InscriptionForm />

                    </div>
                </div>
            </section>
}

export default Inscription