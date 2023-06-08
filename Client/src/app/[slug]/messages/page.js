import { decodeSession } from "@/src/lib/decodeSession"
import { LogoutIcon } from "@/src/components/common/Global/Icons/HeroIcons/LogoutIcon";
import Link from "next/link";
import Label from "@/src/components/common/Global/Label";
import LogoutButton from "@/src/components/common/Global/LogoutButton";
import Aside from "@/src/components/common/Global/Aside";

const page = async () => {

    const session = await decodeSession()

    const params = [
        { url: "mon-profil", text: "Mon profil" },
        { url: "messages", text: "Messages" },
        { url: "parametres", text: "Paramètres" },
      ];

    return  <>
            <section className="bg-gradient-to-b from-[#F7F7F7] to-[#EEE] h-[100vh] w-full flex items-center justify-center">
                <div className="w-[1200px] h-[640px] rounded-lg bg-white shadow-[0_0_8px] shadow-[#444444]/[.13] overflow-hidden flex flex-row">

                    <Aside session={session} />
                    <div className="bg-red-400">
                        <h1>Mon profil</h1>
                    </div>
                </div>
            </section>
            </>
}

export default page
