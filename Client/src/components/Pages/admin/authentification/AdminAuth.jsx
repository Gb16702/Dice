"use client"

import { FormEnglober } from "@/src/components/common/Global/FormEnglober";
import AdminConnexionForm from "@/src/components/common/Global/Forms/AdminConnexionForm";

const AdminAuth = () => {
    return  <section className="h-[100vh] flex items-center justify-center bg-gradient-to-b from-[#F7F7F7] to-[#EEE] relative">
            <div className="absolute w-full top-0 h-[65vh] bg-slate-800 z-0"></div>
                <div className="flex items-center justify-center flex-col w-[1000px] z-10">
                    <div className="w-[330px] flex items-center flex-col">
                            <FormEnglober>
                            <h1 className="font-semibold text-[26px] py-[5px] text-center text-slate-800 pb-[3px]">Administration</h1>
                            <h3 className="font-medium text-[17px] py-[1px] text-center text-slate-600/[.80] pb-[30px]">
                                Connecte-toi à l'administration
                            </h3>
                            <AdminConnexionForm />
                            </FormEnglober>
                    </div>
                </div>
            </section>
}

export default AdminAuth;