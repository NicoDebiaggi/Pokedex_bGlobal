import { PokeProvider } from '../contexts/pokeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <PokeProvider>
      <Component {...pageProps} />
    </PokeProvider>
  )
}

export default MyApp
