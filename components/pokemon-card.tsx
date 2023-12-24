"use client";

import Link from "next/link"
import { useEffect, useState } from "react";

interface PokemonCardProps {
  name: string,
  url: string
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  async function getIndividualPokemon(url: string | URL | Request) {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("indipokemon", data.types);
    return data;
  }
  const [data, setData] = useState({})
  useEffect(() => {
    getIndividualPokemon(url).then((d) => {
      setData(d);
    });
  }, [])
  console.log(data);
  return (
    <div
      className="flex group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      key={url}
    >
      <div className="flex flex-col">
        <h2 className={`text-2xl font-semibold `}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <h3>Types</h3>
        {data != undefined && data?.types?.map((t: any) => {
          return <span>{t.type.name} </span>
        })}
      </div>
      <div>
        <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`} ></img>
      </div>

    </div>
  )
}