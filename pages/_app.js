import { PokeProvider } from '../contexts/pokeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps, list }) {
  return (
    <PokeProvider data={list}>
      <Component {...pageProps} />
    </PokeProvider>
  )
}

MyApp.getInitialProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon")
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let list = await Promise.all(data.results.map(async pokemon => {
    let pokemons = []
    let pokemonRes = await fetch(pokemon.url)
    let pokemonData = await pokemonRes.json()
    pokemons.push(pokemonData)

    return pokemons
  }))

  return { list }
}

export default MyApp