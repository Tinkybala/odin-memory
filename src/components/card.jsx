import { useState } from "react"
import {v4 as uuid} from 'uuid'

export default function Card({pokemon, onClick}){
    return(
        <button className='pokemon' onClick={() => onClick(pokemon)}>
            {pokemon.name}
            <img src={pokemon.src} />
        </button>
    )
}