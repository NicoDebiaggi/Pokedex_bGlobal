import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const usePokeContext = () => useContext(Context)

export function PokeProvider({ children, data }) {
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
    const [detail, setDetail] = useState(false)
    const [pokemons, setPokemons] = useState(data)
    const [count, setCount] = useState(1118)
    const pokeTask = {}

    pokeTask.pokemons = pokemons
    pokeTask.detail = detail
    pokeTask.setDetail = setDetail
    pokeTask.count = count;

    pokeTask.setBaseData = () => {
        setPokemons(data)
    }

    pokeTask.getPokemons = async(params) => {
        if (!params) {
            let res = await fetch(url)
            let data = await res.json()
            setCount(data.count)
            setUrl(data.next? data.next : null)

            let list = await Promise.all(data.results.map(async pokemon => {
                let pokemons = []
                let pokemonRes = await fetch(pokemon.url)
                let pokemonData = await pokemonRes.json()
                pokemons.push(pokemonData)
            
                return pokemons
            }))
            setPokemons([...pokemons, ...list])
            return data.results
        }

        if (params) {
            let search;
            try {
                let res = await fetch("https://pokeapi.co/api/v2/pokemon/" + params.toLowerCase())
                let data = await res.json()
                setUrl("https://pokeapi.co/api/v2/pokemon")
                setPokemons([[data]])
                search = data
            }
            catch{
                console.error("Whoops! Ese Pokemon no existe");
            }

            return search
        }
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

    pokeTask.setNewDetail = (id) => {
        pokemons.find(pokemon => pokemon[0].id == id)
            ? pokeTask.setDetail((pokemons.find(pokemon => pokemon[0].id == id)[0]))
            : pokeTask.getPokemons()
    }

    return (
        <Context.Provider value={{pokeTask}}>
            {children}
        </Context.Provider>
    )
}