"use client"

import Button from "./Button";

const ConnectButton = ({children, variant}) => {

    return <Button className={`${variant === "admin" ? "bg-slate-800" : "bg-vtertiary"} text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-md`}>
        {children}
    </Button>
}

export default ConnectButton;