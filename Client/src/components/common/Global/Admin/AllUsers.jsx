"use client"

import React, { useState } from "react";
import Image from "next/image";
import { timeSince } from "@/src/lib/timeSince";
import Searchbar from "./Searchbar";
import Category from "./Category";
import NotFound from "../Icons/HeroIcons/admin/NotFound";
import Select from "../Select";
import { sortUsers } from "@/src/lib/sortUsers";
import Pagination from "../Icons/HeroIcons/admin/Pagination";
import Link from "next/link";

const AllUsers = ({ users, head, totalPage, initialPage }) => {
  const [search, setSearch] = useState("");
  const [sortedUsers, setSortedUsers] = useState(users);
  const [selectedOption, setSelectedOption] = useState("");
  const [initialUsers, setInitialUsers] = useState(users);

  const handleChange = (searchValue) => {
    setSearch(searchValue);
  };

  const categories = [
    { value: "name-asc", label: "Nom - A-Z" },
    { value: "name-desc", label: "Nom - Z-A" },
    { value: "date-asc", label: "Date - ASC" },
    { value: "date-desc", label: "Date - DESC" },
    { value: "role-asc", label: "Rôle - ASC" },
    { value: "role-desc", label: "Rôle - DESC" },
  ];

  const filteredUsers = sortedUsers.filter((user) => {
    const username = user.username.toLowerCase();
    const searchValue = search.toLowerCase();
    return username.includes(searchValue);
  });

  const handleSelectChange = (value) => {
    if (value === "reset") {
        setSelectedOption("");
        return setSortedUsers(initialUsers);
      }

    const sortedUsersCopy = sortUsers(sortedUsers, value);
    setSortedUsers(sortedUsersCopy);
    setSelectedOption(value);
  };

  const resetSelect = () => {
    setSelectedOption("");
    setSortedUsers(initialUsers);
}

  return (
    <>
      <div className="h-[70px] flex items-end justify-between">
        <Category />
        <div className="flex flex-row justify-center items-center gap-x-2">
        <div className="relative">
          <Select
            options={categories}
            placeholder="Trier les utilisateurs"
            className="text-zinc-400 w-[320px] text-sm h-[43px] px-4 py-2 outline-none bg-zinc-800 rounded-md"
            onChange={handleSelectChange}
            initialUsers={initialUsers}
            onReset={resetSelect}
            />
        </div>
          <Searchbar onChange={handleChange} />
        </div>
      </div>
      {filteredUsers.length === 0 ? (
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
      ) : (
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
              {filteredUsers.map((user, index) => (
                <tr key={index} className="align-top border-t border-zinc-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
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
                      ) :  <div className="w-[36px] h-[36px] rounded-full bg-zinc-800"></div>}
                      <div className="flex flex-col">
                        <h3>{user.username}</h3>
                        <h4 className="text-zinc-400 text-[12px]">
                          {user.roles.name}
                        </h4>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {timeSince(new Date(user.createdAt))}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`http://localhost:3000/administration/utilisateurs/${user.slug}`}
                      className=" text-vprimary hover:underline"
                    >
                      Voir le profil
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Pagination users={filteredUsers} totalPage={totalPage} initialPage={initialPage}  />
        </>
      )}
    </>
  );
};

export default AllUsers;
