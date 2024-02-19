import { useState } from "react";

export function PokeBtns({data}) {
    

    return (
        <button className="pokeCard">
        <p>{data.name}</p>
        <img src={data.sprites.front_default} alt={`${data.name} character image`} />
        </button>
    )
}