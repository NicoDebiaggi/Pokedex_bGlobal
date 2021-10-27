import styles from '../styles/Home.module.css'
import { usePokeContext } from '../contexts/pokeContext'

const PokemonDetail = () => {
    const { pokeTask } = usePokeContext()

    return ( 
        <div className={styles.detailContainer}>
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
                            <p>{pokeTask.detail.types.map(type => pokeTask.capitalizeFirtsLetter(type.type.name)).join(' , ')}</p>
                            <h5>Abilities:</h5>
                            <p>{pokeTask.detail.abilities.map(ability => pokeTask.capitalizeFirtsLetter(ability.ability.name)).join(' , ')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={() => pokeTask.setDetail(false)}>Back</button>
        </div>
     );
}
 
export default PokemonDetail;