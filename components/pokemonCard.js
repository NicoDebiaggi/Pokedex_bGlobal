import Image from 'next/image'
import { usePokeContext } from '../contexts/pokeContext'
import styles from '../styles/Home.module.css'


const PokemonCard = ({ pokemon }) => {
    const { pokeTask } = usePokeContext()
    

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