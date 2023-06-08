import { decodeSession } from "@/src/lib/decodeSession"
import { LogoutIcon } from "@/src/components/common/Global/Icons/HeroIcons/LogoutIcon";
import Link from "next/link";
import Label from "@/src/components/common/Global/Label";
import LogoutButton from "@/src/components/common/Global/LogoutButton";

const page = async () => {

    const session = await decodeSession()

    const params = [
        { url: "mon-profil", text: "Mon profil" },
        { url: "messages", text: "Messages" },
        { url: "paramètres", text: "Paramètres" },
      ];



    return  <>
            <section className="bg-gradient-to-b from-[#F7F7F7] to-[#EEE] h-[100vh] w-full flex items-center justify-center">
                <div className="w-[1200px] h-[640px] rounded-lg bg-white shadow-[0_0_8px] shadow-[#444444]/[.13] overflow-hidden">
                    <aside className="relative h-full w-[20%] bg-[#313338] py-14">
                        <div className="px-7">
                            <div className="w-full h-[45px] text-center text-[26px] font-bold tracking-tight text-[#333333] border-b border-[#333333]">
                                DICE.
                            </div>
                            <div className="mt-6">
                                {params.map((param, index) => (
                                    <>
                                    <Link href={`${process.env.DEV_URL}/${session?.slug}/${param.url}`}>
                                        <Label url={param.url} index={index} text={param.text} />
                                    </Link>
                                    </>
                                ))}
                                <Link href={`/`}>
                                    <Label index={params.length} isSpecific text="Revenir au site" />
                                </Link>
                                <LogoutButton isLogged="Se déconnecter" />
                            </div>
                        </div>
                    <div className="absolute bottom-0 bg-[#222222] w-full h-[95px] flex p-1">
                        <div className="w-full brightness-105 h-full rounded-md px-4 py-4 flex gap-x-3">
                            <div className="rounded-full bg-[#333333] w-[48px] h-[48px]">


                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[17px] text-zinc-300 capitalize font-semibold tracking-tight ">
                                    {session.username}
                                </h2>
                                <h3 className="text-[14px] text-emerald-400 capitalize font-medium tracking-tight ">
                                    {session.roles.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                    </aside>
                </div>
            </section>
            </>
}

export default page