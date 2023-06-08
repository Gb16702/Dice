"use client"

import {useState} from "react";
import { Burger, Burger2, Burger3, User, Dashboard, SideBarMenu  } from "../Icons/HeroIcons/AdminIcons";
import {useSession} from "next-auth/react";
import SidebarLink from "./SideBarLink";
import Locker from "../Icons/HeroIcons/Locker";
import Link from "next/link";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const {data: session} = useSession();

    return (
    <>
      <aside
        className={`${isOpen ? "w-[230px] px-8 " : "w-[75px]"} h-[100vh] bg-zinc-600/[.12] transition-all duration-100 relative`}
      >
        <div className={`min-w-full h-[75px] flex items-center justify-center`}>
          {isOpen && <h1 className="uppercase whitespace-nowrap font-bold text-slate-900 relative top-[2px]">dice admin</h1>}
        </div>
        {isOpen && (
            <div className="w-full h-[150px] flex flex-col">
                <div className="h-[70%] w-full"></div>
                <h2 className="text-slate-800 text-center text-lg tracking-tight font-bold capitalize">
                    {session?.user.username}
                </h2>
                <h3 className="text-emerald-400 text-center text-sm mt-2">
                    {session?.user.roles.name}
                </h3>
            </div>
        )
        }
        <div className={`mt-12 w-full ${!isOpen && "flex justify-center"}`}>
        {
            isOpen ? (
                <div className="flex flex-col">
                <Link href = "/administration/dashboard" className="flex flex-row gap-4">
                    <Dashboard className="text-[20px] flex items-center justify-center text-center top-[2.5px]" />
                    Dashboard
                </Link>
                <Link href = "/administration/users" className="flex flex-row gap-4">
                    <User className="text-[20px] flex items-center justify-center text-center top-[2.5px]" />
                    Utilisateurs
                </Link>
                </div>
            ) :
            <div className="flex-col gap-6">
                <Link href = "/administration/dashboard" className="flex justify-center gap-4 w-full">
                    <Dashboard className="top-[2.5px] text-[25px]" />
                </Link>
                <div className="h-4"></div>
                <Link href = "/administration/users" className="flex justify-center w-full">
                    <User className="top-[2.5px] text-[25px]" />
                </Link>
                </div>
        }
        </div>

      </aside>
      <div className="relative h-[100vh] w-[15px] bg-zinc-600/[.25]" onClick={() => setIsOpen(!isOpen)}>
        <SideBarMenu className="text-zinc-800 absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      </>
    );
  };

  export default Sidebar;
