"use client";

import { usePathname } from "next/navigation";

export const SpecificPathname = () => {

    const pathname = usePathname();

    const isSpecfificPathname = ["/inscription", "/connexion"].includes(pathname);

    return isSpecfificPathname

}