import Link from "next/link";
import AsideChildren from "./AsideChildren";
import AsideUserSection from "./AsideUserSection";
import Label from "./Label";
import LogoutButton from "./LogoutButton";

const Aside = ({ session, children }) => {
  const params = [
    { url: "mon-profil", text: "Mon profil" },
    { url: "messages", text: "Messages" },
    { url: "parametres", text: "Paramètres" },
  ];

  return (
    <aside className="relative h-full w-[20%] bg-[#313338]" session={session}>
      <div className="px-7">
        <div className="w-full pt-[30px] text-center text-[26px] font-bold tracking-tight text-zinc-300 border-b border-[#333333]">
          DICE.
        </div>
        <div className="mt-6">
          {params.map((param, index) => (
            <>
              <AsideChildren
                session={session}
                key={index}
                param={param}
                url={param.url}
              />
            </>
          ))}
          <Link href={`/`}>
            <Label index={params.length} isSpecific text="Revenir au site" />
          </Link>
          <LogoutButton isLogged="Se déconnecter" />
          <AsideUserSection session={session} />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
