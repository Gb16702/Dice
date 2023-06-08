"use client"

import { usePathname } from "next/navigation";
import {Link} from "next/link"

const Label = ({url, text, isSpecific=false}) => {

    const pathname = usePathname();
    const section = pathname.includes(url)
    const isPathname = section

    return (
        <>
            <div className={`w-full h-[60px] rounded-lg my-2 flex items-center justify-center ${isPathname ? "bg-zinc-700/[.6]" : "transparent"}`} url={url}>
                <h3 className={!isSpecific ? "text-lg text-zinc-300" : "text-lg text-red-300"}>{text}</h3>
            </div>
        </>
    )

}

export default Label;