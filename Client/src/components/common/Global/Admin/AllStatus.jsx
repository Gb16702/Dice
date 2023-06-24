"use client"

import React, { useState } from "react";
import { timeSince } from "@/src/lib/timeSince";
import Category from "./Category";
import Link from "next/link";
import Add from "../Icons/HeroIcons/admin/Add";
import AddStatus from "./AddStatus";
import DeleteStatus from "./DeleteStatus";

const StatusRow = ({ state, slug, createdAt, onSelect}) => {
  const [isSelected, setIsSelected] = useState(false);


  const handleSelect = () => {
    setIsSelected(!isSelected)
    onSelect(state, !isSelected)
  }

  return (
    <tr className="align-top border-t border-zinc-800">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <div className="flex items-center justify-start gap-x-5">
          <div className="flex flex-col">
            <h3>{state}</h3>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">{slug}</td>
      <td className="px-6 py-4">{timeSince(new Date(createdAt))}</td>
      <td className="px-6 py-4">
        <h3
          className="text-vprimary cursor-pointer"
          onClick={handleSelect}
        >
          {isSelected ? "Sélectionné" : "Sélectionner"}
        </h3>
      </td>
    </tr>
  );
};

const AllStatus = ({ head, status }) => {

  const [selectedStatus, isSelectedStatus] = useState([])

  const handleSelect = (state, isSelected) => {
    if(isSelected)
      isSelectedStatus([...selectedStatus, state])
    else
      isSelectedStatus(selectedStatus.filter(s => s !== state))
  }

  return (
    <>
      <div className="h-[70px] flex items-end justify-between">
        <Category />
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
              {status
                .sort((a, b) => (a.state > b.state ? 1 : -1))
                .map((s, index) => (
                  <StatusRow key={index} state={s.state} slug={s.slug} createdAt={s.createdAt} status={status} onSelect={handleSelect} />
                ))}
            </tbody>
          </table>
        </section>
        <div className="w-full flex justify-end gap-x-2">
          <DeleteStatus selectedStatus={selectedStatus} />
          <AddStatus />
        </div>
      </>
    </>
  );
};

export default AllStatus;