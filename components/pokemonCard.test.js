/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import PokemonCard from './PokemonCard'
import { PokeProvider } from '../contexts/pokeContext'


test('renders content', () => {
    
    const pokemon = {
        name: 'bulbasaur',
        id: 1,
        types: [
            {type: {name: 'grass'}}
        ],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        },
        stats: [
            {base_stat: 45, stat: {name: 'hp'}}
        ]
    }

    const component = render(
        <PokeProvider value={[[pokemon]]}>
            <PokemonCard pokemon={pokemon}/>
        </PokeProvider>)

    component.getByText('Bulbasaur')
})