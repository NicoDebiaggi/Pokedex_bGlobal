import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePokeContext } from '../contexts/pokeContext'
import styles from '../styles/Home.module.css'


const PokemonCard = ({ data }) => {
    const { pokeTask } = usePokeContext()
    const [pokemon, setPokemon] = useState()
    
    useEffect(() => {
        data.id
        ? setPokemon(data)
        : pokeTask.getPokemon(data.url).then(data => setPokemon(data))
    }, [data.id, data.url])

    return ( 
        pokemon 
            ? <div onClick={() => pokeTask.setDetail(pokemon)} className={styles.card}>
                <Image src={pokemon.sprites.front_default} width="200px" height="200px"/>
                <div className={styles.cardFooter}>
                    <h2>{pokeTask.capitalizeFirtsLetter(pokemon.name)}</h2>
                    <p>{pokeTask.customId(pokemon?.id)}</p>
                </div>
              </div>
            : <div className={styles.loading}><div></div><div></div><div></div><div></div></div>
     );
}
 
export default PokemonCard;