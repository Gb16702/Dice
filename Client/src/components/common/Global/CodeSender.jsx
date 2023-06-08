"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

const CodeSender = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute bg-black/[.5] w-full top-1/2 left-1/2 h-[100vh] -translate-x-1/2 -translate-y-1/2">
          <div className="fixed top-1/2 left-1/2 w-[500px] h-[260px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-[14px]">
            <h3 className="text-zinc-800 text-[20px] tracking-tight">
              Code envoyé !
            </h3>
            <h4 className="mt-1 text-sm text-zinc-500/[.8]">
              Un code a été envoyé à ton adresse mail ! <br />
              Entre le dans le champs ci-dessous :
            </h4>
          </div>
        </div>
      )}
      <div>
        <h3 className="mt-4 text-base text-zinc-800">
          Jeton d'administration :
        </h3>
        <h4 className="mt-1 text-sm text-zinc-500/[.8]">
          Obtenir un jeton te permettra d'accéder à l'interface d'administration
          de l'application
        </h4>
        <h4
          className="text-emerald-400 text-sm mt-1 cursor-pointer"
          onClick={handleClick}
        >
          Générer un jeton
        </h4>
      </div>
    </>
  );
};

export default CodeSender;
