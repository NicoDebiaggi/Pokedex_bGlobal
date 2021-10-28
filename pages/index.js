import Head from 'next/head'
import { useEffect, useState } from 'react'
import PokemonDetail from '../components/pokemonDetail'
import PokemonList from '../components/pokemonList'
import Searcher from '../components/searcher'
import { usePokeContext } from '../contexts/pokeContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { pokeTask } = usePokeContext()
  const [toSearch, setToSearch] = useState('')

  useEffect(() => {
    toSearch ? pokeTask.getPokemons(toSearch) : (pokeTask.pokemons.length > 1) ? null : pokeTask.setBaseData()

    window.onscroll = (e) => {
      const end = ((e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop) === e.target.documentElement.clientHeight)
      end && pokeTask.getPokemons(toSearch)
    }
  }, [toSearch, pokeTask.pokemons])

  return (
    <div className={styles.container} >
      <Head>
        <title>Pokedex</title> 
        <link rel="icon" href="/pokeball.png" />
      </Head>

      <Searcher setToSearch={setToSearch}/>

      <PokemonList data={pokeTask.pokemons} />

      {pokeTask.detail ? <PokemonDetail /> : null}
    </div>
  )
}