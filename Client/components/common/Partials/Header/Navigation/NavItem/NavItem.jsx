"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({text, link, isLogo = false}) => {
    const path = usePathname();
    return  <span className="px-[12px]">
                <Link href = {link} className={`text-sm ${path === link || isLogo ? "text-vprimary" : "text-[#DFE0D7]"}`}>{text}</Link>
            </span>
}

export default NavItem