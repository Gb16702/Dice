"use client";

import { timeSince } from "@/src/lib/timeSince";
import Category from "./Category";
import Edit from "../Icons/HeroIcons/admin/Edit";
import { useState } from "react";
import { Close } from "../Icons/HeroIcons/Close";
import { ArrowTop, ArrowBottom } from "../Icons/HeroIcons/admin/ArrowsForMenu";
import Select from "../Select";
import { toast } from "react-hot-toast";
import Toast from "../Toast";
import { useRouter } from "next/navigation";
import Searchbar from "./Searchbar";
import Search from "../Icons/HeroIcons/admin/Search";
import Rectangle from "../Icons/HeroIcons/admin/Rectangle";
import NotFound from "../Icons/HeroIcons/admin/NotFound";
import Image from "next/image";


const RolesRow = ({ name, slug, grade, createdAt, User }) => {
  return (
    <tr className="align-top border-t border-zinc-800">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <div className="flex items-center justify-start gap-x-5">
          <div className="flex flex-col">
            <h3>{name}</h3>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">{grade}</td>
      <td className="px-6 py-4">{timeSince(new Date(createdAt))}</td>
      <td className="px-6 py-4">{User}</td>
    </tr>
  );
};

const AllRoles = ({ head, roles, users, session }) => {
  const [isOpen, setIsOpen] = useState(false),
    [isLoading, setIsLoading] = useState(false),
    [isSelectedRole, setIsSelectedRole] = useState(roles.map(() => false)),
    [selectedOption, setSelectedOption] = useState(""),
    [roleChanges, setRoleChanges] = useState([]),
    [isSearchActive, setIsSearchActive] = useState(false),
    [search, setSearch] = useState("");

  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    setIsOpen(true);
    setIsLoading(false);
  };

  const handleClickRoles = (index) => {
    setIsSelectedRole((prevSelectedRoles) =>
      prevSelectedRoles.map((selected, i) =>
        i === index ? !selected : selected
      )
    );
  };

  const filteredUsersByRole = (users, rolename) => {
    return users.filter((user) => user.roles.name === rolename);
  };

  const filteredRoleForSelect = (users) => {
    const userRoleName = users.roles.name;
    return roles
      .filter((role) => role.name !== userRoleName && role.name !== "Fondateur")
      .map((role) => ({
        value: role.name,
        label: role.name,
      }));
  };

  const handleResetSelect = (user) => {
    const updatedRoleChanges = roleChanges.filter(
      (change) => change.user !== user.username
    );
    setRoleChanges(updatedRoleChanges);
    setSelectedOption(updatedRoleChanges.length > 0 ? "save" : "");
  };

  function handleSelectChange(value, user) {
    const updatedRoleChanges = [...roleChanges],
      existingChangeIndex = updatedRoleChanges.findIndex((change) => {
        return change.user === user.username;
      });

    if (existingChangeIndex !== -1)
      updatedRoleChanges[existingChangeIndex].newRole = value;
    else {
      updatedRoleChanges.push({
        user: user.username,
        previousRole: user.roles.name,
        newRole: value,
      });
    }

    setRoleChanges(updatedRoleChanges);
    setSelectedOption("save");
  }

  const handleSave = async () => {
    if (roleChanges.length === 0) {
      return;
    }

    const userUpdates = roleChanges.map((change) => ({
      id: users.find((user) => user.username === change.user)._id,
      newRole: change.newRole,
    }));

    try {
      const response = await fetch(`http://localhost:8000/api/user/roles`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUpdates }),
      });
      if (!response.ok) {
        toast.custom(
          <Toast
            message="Une erreur est survenue"
            variant="error"
            type="Erreur"
            dark
          />
        );
      } else {
        await response.json();
        toast.custom(
          <Toast
            message="Rôles mis à jour avec succès"
            variant="success"
            type="Succès"
            dark
          />
        );
        router.refresh();
        setIsOpen(false);
      }
    } catch (e) {
      console.error(`Erreur lors de la mise à jour`, e);
    }
  };

  const handleChange = (e) => {
    setSearch(e);
  };

  const filteredUsersBySearch = users.filter((user) => {
    if (
      user.username.toLowerCase() !== session.username.toLowerCase() &&
      user.roles.grade >= session.roles.grade
    ) {
      if (user.username.toLowerCase().includes(search.toLowerCase())) {
        return user;
      }
    }
  });

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5]"></div>
          <div className="fixed z-20 top-1/2 left-1/2 w-[570px] -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800 ">
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                Gérer les rôles
              </h3>
              <div className="flex items-center gap-x-1 flex-row">
                <div
                  className="p-2 bg-zinc-900 cursor-pointer rounded-md"
                  onClick={() => setIsSearchActive(!isSearchActive)}
                >
                  {isSearchActive ? (
                    <Rectangle className="w-5 h-5 text-zinc-100" />
                  ) : (
                    <Search className="w-5 h-5 text-zinc-100" />
                  )}
                </div>
                <div
                  className="p-2 bg-zinc-900 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <Close className="text-xl  fill-zinc-100" />
                </div>
              </div>
            </div>
            {isSearchActive ? (
              <div className="w-full py-3 rounded-md mt-3 flex flex-col gap-y-2">
                <Searchbar variant="roles" onChange={handleChange} />
                {filteredUsersBySearch && (
                  <>
                    {filteredUsersBySearch.length > 0 ? (
                      <>
                        <h3 className="text-sm text-zinc-100 mt-2">
                          {filteredUsersBySearch.length +
                            " résultat" +
                            (filteredUsersBySearch.length > 1 ? "s" : "")}
                        </h3>
                        {filteredUsersBySearch
                          .map((user, index) => (
                            <div
                              key={index}
                              className=" bg-zinc-900 hover:bg-zinc-950/[.45] transition duration-200 rounded-md gap-y-2 flex py-5 row justify-between px-2 overflow-auto max-h-[200px]"
                            >
                              <div className="flex items-center justify-start gap-x-5">
                                {user?.avatar ? (
                                  <Image
                                    src={user.avatar}
                                    alt={`Image de profil de ${user.username}`}
                                    className="rounded-full object-cover w-[36px] h-[36px]"
                                    width={50}
                                    height={50}
                                  />
                                ) : (
                                  <div className="w-[36px] h-[36px] rounded-full bg-zinc-800"></div>
                                )}
                                <div className="flex flex-col">
                                  <h3 className="text-sm text-zinc-100">
                                    {user.username}
                                  </h3>
                                  <h4 className="text-zinc-400 text-[12px]">
                                    {user.roles.name}
                                  </h4>
                                </div>
                              </div>
                              <Select
                                placeholder="Modifier le rôle"
                                options={filteredRoleForSelect(user)}
                                className="text-zinc-400 w-[280px] text-sm h-[38px] px-4 py-2 outline-none bg-[#1D1D20] rounded-md"
                                onChange={(value) =>
                                  handleSelectChange(value, user)
                                }
                                onReset={() => handleResetSelect(user)}
                              />
                            </div>
                          ))}
                      </>
                    ) : (
                      <>
                        <section className="w-full flex items-center justify-center h-[400px]">
                          <div className="w-full">
                            <div className="rounded-md bg-adminBgAlt w-full h-[330px] flex items-center justify-center flex-col">
                              <NotFound />
                              <h3 className="text-center text-[16px] tracking-tight text-zinc-300">
                                Pas de résultat pour cette recherche
                              </h3>
                            </div>
                          </div>
                        </section>
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="w-full py-3 rounded-md mt-3 flex flex-col gap-y-2">
                {roles
                  .sort((a, b) => (a.grade > b.grade ? 1 : -1))
                  .map((role, index) => (
                    <div
                      key={index}
                      className=" bg-zinc-900 hover:bg-zinc-950/[.45] transition duration-200 rounded-md gap-y-2 flex py-5 flex-col px-2 overflow-auto max-h-[200px]"
                    >
                      <button
                        className="flex items-center justify-between"
                        onClick={() => handleClickRoles(index)}
                      >
                        <h3 className="text-zinc-300">{role.name}</h3>
                        {isSelectedRole[index] ? (
                          <ArrowTop className="w-5 h-5 stroke-zinc-300" />
                        ) : (
                          <ArrowBottom className="w-5 h-5 stroke-zinc-300" />
                        )}
                      </button>
                      {isSelectedRole[index] && (
                        <div className="mt-2">
                          {filteredUsersByRole(users, role.name).length < 1 ? (
                            <h3 className="text-zinc-300 text-[13px]">
                              Pas d'utilisateur
                            </h3>
                          ) : (
                            filteredUsersByRole(users, role.name).map(
                              (user, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between border-t-[.5px] border-zinc-800 py-3"
                                >
                                  <h3
                                    className={`text-[15px] ${
                                      user.username === session.username
                                        ? "text-vprimary"
                                        : "text-zinc-300"
                                    }`}
                                  >
                                    {user.username === session.username
                                      ? session.username + " - toi"
                                      : user.username}
                                  </h3>
                                  {user.username !== session.username && (
                                    <Select
                                      placeholder="Modifier le rôle"
                                      options={filteredRoleForSelect(user)}
                                      className="text-zinc-400 w-[280px] text-sm h-[38px] px-4 py-2 outline-none bg-[#1D1D20] rounded-md"
                                      onChange={(value) =>
                                        handleSelectChange(value, user)
                                      }
                                      onReset={() => handleResetSelect(user)}
                                    />
                                  )}
                                </div>
                              )
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {selectedOption === "save" && roleChanges.length > 0 && (
              <button
                onClick={handleSave}
                className="w-[200px] h-[46px] text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200"
              >
                Sauvegarder
              </button>
            )}
          </div>
        </>
      )}
      <div className="h-[70px] flex items-end justify-between">
        <Category />
        <div className="flex flex-row justify-center items-center gap-x-2">
          <div className="relative">
            <button
              className="text-zinc-400 w-[320px] text-sm h-[43px] px-4 py-2 outline-none bg-zinc-800 rounded-md flex justify-start items-center gap-x-2"
              onClick={handleClick}
            >
              <Edit className="w-5 h-5 text-zinc-400" />
              <h3 className="text-zinc-400 text-sm">
                {isLoading ? "Chargement..." : "Gérer les rôles"}
              </h3>
            </button>
          </div>
        </div>
      </div>
      <>
        <section className="w-full rounded-md bg-adminBgAlt overflow-hidden">
          <table className="w-full h-full text-sm text-left">
            <thead className="text-xs uppercase bg-zinc-800">
              <tr className="text-zinc-100">
                {head.map((item, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 font-medium tracking-wider"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-adminBgAlt text-zinc-100">
              {roles
                .sort((a, b) => (a.grade > b.grade ? 1 : -1))
                .map((r, index) => {
                  const userCount = users.filter(
                    (user) => user.roles.name === r.name
                  ).length;
                  return (
                    <RolesRow
                      key={index}
                      name={r.name}
                      slug={r.slug}
                      grade={r.grade}
                      createdAt={r.createdAt}
                      User={userCount}
                    />
                  );
                })}
            </tbody>
          </table>
        </section>
      </>
    </>
  );
};

export default AllRoles;
