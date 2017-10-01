import React from 'react'
import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import App from './App'

test('renders App without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('empty app renders correctly', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
