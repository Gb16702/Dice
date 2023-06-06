"use client"

import {useState} from "react";
import { Burger2 } from "../Icons/HeroIcons/Burger";

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    return  <aside className={`${isOpen ? "w-[300px]" : "w-[75px]"  } h-full bg-zinc-600/[.12] transition-all duration-100`}>
                <div className="w-full h-[75px] flex items-center justify-around">
                    {isOpen && <h1 className="uppercase whitespace-nowrap">dice administration</h1>}
                    <Burger2 onClick = {() => setIsOpen(!isOpen)}/>
                </div>
                {children}
            </aside>
}

export default Sidebar