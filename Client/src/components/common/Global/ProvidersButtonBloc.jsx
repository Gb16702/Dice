import Button from "./Button";
import { signIn } from "next-auth/react"
import { useState } from "react";
import Google from "../../common/Global/Icons/BrandLogos/Google";
import Discord from "../../common/Global/Icons/BrandLogos/Discord";

const ProvidersButtonsBloc = () => {

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

    return <>
        <Button className={`border border-[#c2c8d0] text-white w-full h-[50px] gap-4 flex items-center  text-sm disabled:opacity-50 disabled:pointer-events-none px-3 rounded-sm mt-2 transition duration-200 ${isLoadingGoogle ? "bg-vprimary/[.16]" : "bg-white hover:bg-zinc-200/[.60]"}`} onClick={loginWithGoogle}>
            <Google />
            <h3 className="text-zinc-500 text-base font-normal">
                {isLoadingGoogle ? "Connexion en cours..." : "Continuer avec Google"}
            </h3>
        </Button>
        <Button className={`border border-[#c2c8d0] text-white w-full h-[50px] gap-4 flex items-center  text-sm disabled:opacity-50 disabled:pointer-events-none px-3 rounded-sm mt-2 transition duration-200 ${isLoadingDiscord ? "bg-vprimary/[.16]" : "bg-white hover:bg-zinc-200/[.60]"}`} onClick={loginWithDiscord}>
            <Discord color={"#5865F2"} />
            <h3 className="text-zinc-500 text-base font-normal">
                {isLoadingDiscord ? "Connexion en cours..."  : "Continuer avec Discord"}
            </h3>
        </Button>
    </>
}

export default ProvidersButtonsBloc;