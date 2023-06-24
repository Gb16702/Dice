import { decodeSession } from "@/src/lib/decodeSession"
import Notifications from "./Notifications";
import SelfHandler from "./SelfHandler";

const Header = async () => {

    const session = await decodeSession()

    return  <header className="h-[90px] bg-adminBgAlt w-full flex px-[25px] items-center justify-between">
                <div className="capitalize whitespace-nowrap font-semibold tracking-wide text-[20px] text-zinc-100">
                    dice.
                </div>
                <div className="flex flex-row items-center justify-end gap-x-4 ">
                    <Notifications session={session} />
                    <div className="w-12 h-12 flex items-center justify-center">
                        <SelfHandler session={session} />
                    </div>
                </div>
            </header>
}

export default Header