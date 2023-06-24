import Button from "@/src/components/common/Global/Button"
import Header from "@/src/components/common/Partials/Header/Header"
import { decodeSession } from "@/src/lib/decodeSession"

const jeux = async () => {

    const session = await decodeSession()
    return (
        <>
            <div className="h-[100vh] flex items-center justify-center text-white">
            {session?.username}
            </div>
        </>
    )
}

export default jeux