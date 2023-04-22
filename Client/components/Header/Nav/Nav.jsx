import Discord from "../../Globals/BrandLogos/Discord"
import Github from "../../Globals/BrandLogos/Github"
import NavItems from "./NavItem/NavItem"

const Nav = () => {
    return (
        <nav className="w-[1500px] bg-transparent h-[65px] flex flex-row justify-between">
            <ul className="w-[300px] h-full flex items-center">
                <li>
                    <NavItems text = "Random Games" />
                </li>
            </ul>
            <ul className="w-[600px] h-full flex items-center">
                <li className="border-r border-zinc-700/70 pr-5">
                    <NavItems text = "Accueil" />
                    <NavItems text = "Jeux" />
                    <NavItems text = "Actualités" />
                    <NavItems text = "A propos" />
                </li>
                <Github />
                <Discord />
            </ul>
        </nav>
    )
}

export default Nav