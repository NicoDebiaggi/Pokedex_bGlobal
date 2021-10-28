/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Searcher from './searcher'


test('renders content', () => {
   const searchHandler = jest.fn()

   const component = render(<Searcher setToSearch={searchHandler}/>)

   const input = component.getByPlaceholderText('Search a Pokemon...')
   fireEvent.change(input, { target: { value: 'pikachu' } })


   expect(searchHandler).toHaveBeenCalledTimes(1)
   expect(searchHandler).toHaveBeenCalledWith('pikachu')
})