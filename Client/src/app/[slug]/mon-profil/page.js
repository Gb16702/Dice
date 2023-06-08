import { decodeSession } from "@/src/lib/decodeSession"
import { LogoutIcon } from "@/src/components/common/Global/Icons/HeroIcons/LogoutIcon";
import Link from "next/link";
import Label from "@/src/components/common/Global/Label";
import LogoutButton from "@/src/components/common/Global/LogoutButton";
import Aside from "@/src/components/common/Global/Aside";
import CodeSender from "@/src/components/common/Global/CodeSender";

const page = async () => {

    const session = await decodeSession()
    return  <>
            <section className="bg-gradient-to-b from-[#F7F7F7] to-[#EEE] h-[100vh] w-full flex items-center justify-center">
                <div className="w-[1200px] h-[640px] rounded-lg bg-white shadow-[0_0_8px] shadow-[#444444]/[.13] overflow-hidden flex flex-row">
                    <Aside session={session} />
                    <div className="pt-[30px] px-4">
                        <h2 className="text-[26px] font-medium tracking-tight">
                            {session?.username}
                        </h2>
                        <CodeSender />

                    </div>
                </div>
            </section>
            </>
}

export default page
