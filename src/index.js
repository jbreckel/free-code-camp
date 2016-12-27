import 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.css'

require('smoothscroll-polyfill').polyfill()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
