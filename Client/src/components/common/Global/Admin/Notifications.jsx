"use client";

import Notif from "../Icons/HeroIcons/admin/Notif";
import { useState, useContext, createContext } from "react";
import NotificationSection from "./NotificationsSection";

const Notifications = ({session}) => {

    const  [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
    }

    return <>
    <div onClick={handleClick}>
    <Notif className="w-6 h-6 stroke-white" />
    {isOpen && (
        <>
        <div className="absolute w-[100vw] top-0 left-0 z-10 h-full bg-black/[.15]" />
        <NotificationSection session={session} />
        </>
    )}
    </div>
    </>
}

export default Notifications