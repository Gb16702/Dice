"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({text, link}) => {
    const path = usePathname();
    return  <span className="px-[12px]">
                <Link href = {link} className={`font-medium text-sm ${path === link ? "text-[#7e60e1]" : "text-[#DFE0D7]"}`}>{text}</Link>
            </span>
}

export default NavItem