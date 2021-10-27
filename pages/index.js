import Head from 'next/head'
import { useEffect, useState } from 'react'
import PokemonDetail from '../components/pokemonDetail'
import PokemonList from '../components/pokemonList'
import Searcher from '../components/searcher'
import { usePokeContext } from '../contexts/pokeContext'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  const { pokeTask } = usePokeContext()
  const [pokemons, setPokemons] = useState([...data.results])
  const [toSearch, setToSearch] = useState('')


  useEffect(() => {
    if((pokemons.length === 1 && toSearch == '')) {
      setPokemons([...data.results]) 
    }
    if (toSearch !== '') {
      pokeTask.getPokemons(toSearch)
      .then(search => {
              search ? setPokemons([search]) : null 
            })
    }
  }, [pokemons, toSearch])


  useEffect(() => { 
    const nextPage = () => {pokeTask.getPokemons().then(data => {
      data ? setPokemons([...pokemons, ...data]) : null
    })}

    window.onscroll = (e) => {
      const end = ((e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop) === e.target.documentElement.clientHeight)
      end ? nextPage() : null
    }
  }, [pokemons])


  return (
    <div className={styles.container} >
      <Head>
        <title>Pokedex</title> 
        <link rel="icon" href="/pokeball.png" />
      </Head>

      <Searcher setToSearch={setToSearch}/>

      <PokemonList data={pokemons} />

      {pokeTask.detail ? <PokemonDetail /> : null}
    </div>
  )
}

Home.getInitialProps = async () => {
  let res = await fetch("https://pokeapi.co/api/v2/pokemon")
  let data = await res.json()

  return { data }
}