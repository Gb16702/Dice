import { usePathname } from "next/navigation"

export const getPathname = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split("/")[2];
    return pathnameArray;
}