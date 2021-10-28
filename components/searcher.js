import styles from '../styles/Home.module.css'


const Searcher = ({ setToSearch }) => {
    
    const handleChange = (e) => {
        setToSearch(e.target.value)
    }

    return ( 
        <div className={styles.searcher}>
            <div className={styles.form__group}>
                <input type="text" className={styles.form__input} id="name" placeholder="Search a Pokemon..." onChange={(e) => handleChange(e)} />
                <label className={styles.form__label}>Search a Pokemon</label>
            </div>
        </div>
     );
}
 
export default Searcher;