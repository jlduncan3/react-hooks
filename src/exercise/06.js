import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemonState, setPokemonState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })

  const {status, pokemon, error} = pokemonState

  React.useEffect(() => {
    setPokemonState({pokemon: null, error: null, status: 'pending'})
    if (!pokemonName) {
      setPokemonState({pokemon: null, status: 'idle', error: null})
      return
    }

    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemonState({status: 'resolved', pokemon})
      },
      error => {
        setPokemonState({status: 'rejected', error})
      },
    )
  }, [pokemonName])

  if (status === 'rejected') {
    throw error
  } else if (status === 'idle') {
    return <span>Submit a Pokemon</span>
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          resetKeys={[pokemonName]}
          key={pokemonName}
          onReset={handleReset}
          FallbackComponent={ErrorFallback}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
