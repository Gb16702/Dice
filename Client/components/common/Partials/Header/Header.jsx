"use client";

import React, { useState, useEffect } from "react";
import Nav from "./Navigation/Nav";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    backgroundColor: isScrolled ? "#1E1E20" : null
  };

  const headerClassName = "w-full h-[64px] fixed flex justify-center z-50";

  return <header className={headerClassName} style={headerStyle}>
            <Nav />
         </header>
};

export default Header;
