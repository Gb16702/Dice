import { decodeSession } from "@/src/lib/decodeSession"
import { LogoutIcon } from "@/src/components/common/Global/Icons/HeroIcons/LogoutIcon";
import Link from "next/link";
import Label from "@/src/components/common/Global/Label";
import LogoutButton from "@/src/components/common/Global/LogoutButton";
import Aside from "@/src/components/common/Global/Aside";
import CodeSender from "@/src/components/common/Global/CodeSender";
import UserProfileCredentials from "@/src/components/common/Global/UserProfileCredentials";
import DeleteAccount from "@/src/components/common/Global/DeleteAccount";

const page = async () => {

    const session = await decodeSession()
    return  <>
            <section className="bg-gradient-to-b from-[#F7F7F7] to-[#EEE] h-[100vh] w-full flex items-center justify-center">
                <div className="w-[1400px] h-[700px] rounded-lg bg-white shadow-[0_0_8px] shadow-[#444444]/[.13] overflow-hidden flex flex-row">
                    <Aside session={session} />
                    <div className="pt-[30px] pb-[40px] px-4 overflow-y-scroll w-full">
                        <UserProfileCredentials session={session} />
                        <DeleteAccount />
                        <CodeSender />

                    </div>
                </div>
            </section>
            </>
}

export default page
