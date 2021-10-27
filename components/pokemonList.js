import PokemonCard from "./pokemonCard";
import styles from '../styles/Home.module.css'


const PokemonList = ({ data }) => {
    return ( 
        <div className={styles.grid}>
            {
                data.map((pokemon, i) => (
                    <PokemonCard key={i} data={pokemon} />
                ))
            }
        </div>
    );
}
 
export default PokemonList;