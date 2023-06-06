"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {MdKeyboardArrowDown} from "react-icons/md"
import {Menu} from "@headlessui/react"
import { signOut } from "next-auth/react"
import LogoutButton from "./LogoutButton"
import {useSession} from "next-auth/react"

const Profile = () => {

    const {data:session} = useSession();

    const handleClick = () => {
        signOut()
        console.log(session);
    }

    console.log(session);
    return <span className="px-[12px]">
                <Menu as ="div" onClick={handleClick}>
                    <Menu.Button>
                        <span>
                            <li className="inline text-sm text-[#DFE0D7]">
                                Profil
                            </li>
                            <MdKeyboardArrowDown className="text-white inline" />
                        </span>
                    </Menu.Button>
                    <Menu.Items className="fixed w-[150px]">
                        <Menu.Item>
                            <>
                                <Link href="/" className="text-red-400">
                                    Votre profil
                                </Link>
                                <LogoutButton className="text-red-400" />
                            </>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </span>
}

export default Profile