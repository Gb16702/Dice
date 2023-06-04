import {useSession, signOut } from "next-auth/react";

const LogoutButton = () => {
    const {data:session} = useSession();
    return  <button onClick={() => signOut()} disabled={!session}>
                <h3 className="text-zinc-600">Déconnexion</h3>
            </button>
}

export default LogoutButton;