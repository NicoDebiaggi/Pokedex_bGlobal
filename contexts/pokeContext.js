import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const usePokeContext = () => useContext(Context)

export function PokeProvider({children}){
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
    const [detail, setDetail] = useState(false)

    const pokeTask = {}

    pokeTask.detail = detail
    pokeTask.setDetail = setDetail

    pokeTask.getPokemons = async(params) => {
        if (url && !params) {
            let res = await fetch(url)
            let data = await res.json()
            setUrl(data.next? data.next : null)
            return data.results
        }
        if (params) {
            let search;
            try {
                let res = await fetch("https://pokeapi.co/api/v2/pokemon/" + params.toLowerCase())
                let data = await res.json()
                setUrl("https://pokeapi.co/api/v2/pokemon")
                search = data
            }
            catch{
                console.error("Whoops! Ese Pokemon no existe");
            }

            return search
        }
    }

    pokeTask.getPokemon = async(pokemonUrl) => {
        let res = await fetch(pokemonUrl)
        let data = await res.json()

        return data
    }

    pokeTask.capitalizeFirtsLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    pokeTask.customId = (id) => {
        let customId;
        id
        ? customId = ('#' + ('#0000'+ id).slice(-4))
        : null

        return customId
    }

    return (
        <Context.Provider value={{pokeTask}}>
            {children}
        </Context.Provider>
    )
}