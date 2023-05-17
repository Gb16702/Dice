"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

const AuthProvider = ({children})  => {

    return  <SessionProvider refetchInterval={5 * 60}>
                {children}
            </SessionProvider>
}

export default AuthProvider;