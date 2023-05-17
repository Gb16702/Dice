"use client";

import React, { useState, useEffect } from "react";
import Nav from "./Navigation/Nav";
import {usePathname} from "next/navigation";

const Header = () => {

  const router = usePathname();
  console.log(router);

  const specificPathnameArray = [
    "/connexion",
    "/inscription",
  ]

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    backgroundColor: isScrolled || specificPathnameArray.includes(router) ? "#1E1E20" : null
  };

  const headerClassName = "w-full h-[64px] fixed flex justify-center z-50";

  return <header className={headerClassName} style={headerStyle} pathanme = {router.pathname}>
            <Nav />
         </header>
};

export default Header;
