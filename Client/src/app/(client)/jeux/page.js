import Button from "@/src/components/common/Global/Button"
import Header from "@/src/components/common/Partials/Header/Header"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"

const jeux = async () => {
    const session = await getServerSession(authOptions)

    return (
        <>
            <Header />
            <div className="h-[100vh] flex items-center justify-center text-white">
            {JSON.stringify(session)}
            </div>
        </>
    )
}

export default jeux