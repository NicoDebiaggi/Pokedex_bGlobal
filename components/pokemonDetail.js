import styles from '../styles/Home.module.css'
import { usePokeContext } from '../contexts/pokeContext'

const PokemonDetail = () => {
    const { pokeTask } = usePokeContext()

    const typeDictionary = {
        normal: "#9E997B",
        electric: "#EAD246",
        fairy: "#E6AADE",
        water: "#748FD6",
        poison: "#A34297",
        ghost: "#725796",
        ground: "#D6C180",
        fighting: "#B53932",
        fire: "#F7822D",
        steel: "#B8B7D2",
        flying: "#A992E3",
        bug: "#A8B623",
        psychic: "#F15C85",
        dark: "#5D5D5D",
        dragon: "#8B6AC9",
        ice: "#90C9E9",
        rock: "#B9A049",
        grass: "#8BC34A"
    } 

    return ( 
        <div className={styles.detailContainer}>
            <div className={styles.controllsContainer}>
                {(pokeTask.detail?.id-1 > 0) ? (pokeTask.detail?.id-1 < pokeTask.count) 
                ? <span key={pokeTask.detail?.id-1} className={styles.controlls} id={pokeTask.detail?.id-1} onClick={(e) => pokeTask.setNewDetail(e.target.id)}>{pokeTask.customId(pokeTask.detail?.id-1)}</span>
                : <span/> : <span/>}

                <div className={styles.detail}>
                    <div className={styles.detailImg}>
                        <img src={pokeTask.detail.sprites.front_default} width="350px" height="350px"/>
                    </div>
                    <div>
                        <h1 className={styles.detailTitle}><em>{pokeTask.capitalizeFirtsLetter(pokeTask.detail.name)}</em> {pokeTask.customId(pokeTask.detail?.id)}</h1>
                        <div className={styles.detailInfo}>
                            <div>
                                <h5>Height:</h5>
                                <p>{pokeTask.detail.height/10}m</p>
                                <h5>Weight:</h5>
                                <p>{pokeTask.detail.weight/10}kg</p>
                            </div>
                            <div>
                                <h5>Type:</h5>
                                {pokeTask.detail.types.map((type) => {
                                    let capType = pokeTask.capitalizeFirtsLetter(type.type.name)
                                    let color = typeDictionary[type.type.name]

                                    return <span className={styles.type} style={{"backgroundColor": color}}>{capType}</span>
                                })}
                                <h5>Abilities:</h5>
                                {pokeTask.detail.abilities.map(ability => <p>- {pokeTask.capitalizeFirtsLetter(ability.ability.name)}</p>)}
                            </div>
                        </div>
                    </div>
                </div>

                {(pokeTask.detail?.id+1 > 0) ? (pokeTask.detail?.id+1 < pokeTask.count) 
                ? <span key={pokeTask.detail?.id+1} className={styles.controlls} id={pokeTask.detail?.id+1} onClick={(e) => pokeTask.setNewDetail(e.target.id)}>{pokeTask.customId(pokeTask.detail?.id+1)}</span>
                : <span/> : <span/>}
            </div>

            <button onClick={() => pokeTask.setDetail(false)}>Back</button>
        </div>
     );
}
 
export default PokemonDetail;