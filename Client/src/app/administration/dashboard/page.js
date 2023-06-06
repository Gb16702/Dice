"use client"

import { useSession } from "next-auth/react";

const dashboard = () => {

    const {data: session, status} = useSession();
    console.log(session);

    return <h1>Dashboard</h1>
}

export default dashboard;