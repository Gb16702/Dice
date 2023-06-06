"use client";

import React, { useState, useEffect } from "react";
import Nav from "./Navigation/Nav";
import { SpecificPathname } from "@/src/lib/SpecificPathname";
import style from "@/styles/headerStyle.module.css";

const Header = ({template}) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const isSpecificPathname = SpecificPathname();

  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    backgroundColor: isSpecificPathname ? isScrolled ? "#1E1E20" : "transparent" : isScrolled ? "#1E1E20" : "transparent",
  };

  const headerClassName = "w-full h-[64px] fixed flex justify-center z-50";

  return <header className={`${headerClassName} ${template === "auth" ? style.secondaryHeader : style.mainHeader}`} style={headerStyle}>
            <Nav />
         </header>
};

export default Header;
