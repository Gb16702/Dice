"use client";

import { getPathname } from "@/src/lib/getPathname";

const Pathname = () => {

    return  <div>
                <h1 className="capitalize text-zinc-100 w-full h-[90px] mt-[20px] font-medium flex items-center justify-start text-[28px] tracking-tight">{getPathname()}</h1>
            </div>
}

export default Pathname;