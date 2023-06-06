import {Discord} from "@/src/components/common/Global/Icons/BrandLogos/Discord"
import NavItem from "./NavItem/NavItem"
import Github from "@/src/components/common/Global/Icons/BrandLogos/Github"
import {useSession} from "next-auth/react";
import Profile from "../../../Global/Profile";
import { getServerSession } from "next-auth";

const Nav = () => {

    const {data:session} = useSession();

    return <nav className="w-[1500px] bg-transparent h-full flex flex-row justify-between">
                <ul className="w-[300px] h-full flex items-center">
                    <li className="rounded-full border pb-[2px] border-vtertiary bg-vsecondary/[.14]">
                        <NavItem link="/" isLogo = {true} text="DICE." />
                    </li>
                </ul>
                <ul className="w-[640px] h-full flex items-center">
                    <li className="border-r border-zinc-700/70 pr-5 flex">
                        <NavItem link="/" text="Accueil" />
                        <NavItem link="/jeux" text="Jeux" />
                        <NavItem link="/actus" text="Actualités" />
                        <NavItem link="/contact" text="Contact" />
                        {session ?
                        /**
                         * @todo
                        *
                        */


                         <Profile />
                                                 :
                        <NavItem link="/connexion" text="Connexion" />
                        }
                    </li>
                    <li className="flex flex-row h-[24px] items-center px-5 whitespace-nowrap border-r border-zinc-700/70 ">
                        <NavItem link="/versions" text="Version : 1.0.0" />
                    </li>
                    <li className="flex flex-row pl-5 h-[24px] items-center gap-1">
                        <Discord />
                        <Github />
                    </li>
                </ul>
            </nav>
}

export default Nav