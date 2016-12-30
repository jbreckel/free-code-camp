import React from 'react'

import { FormControl } from 'react-bootstrap'

import { compose, mapProps, withState } from 'recompose'

const SearchBox = ({ handleChange, onKeyPress, value, search }) => (
  <div
    style={{
      display: 'flex',
      width: '25%',
      margin: 15,
      justifyContent: 'space-between',
    }}
  >
    <FormControl
      autoComplete="off"
      type="text"
      value={ value }
      placeholder="Enter your search for wikipedia"
      onChange={ handleChange }
      onKeyPress={ onKeyPress }
      style={{
      }}
    />
    <button onClick={ () => search(value) } >
      <i className="fa fa-search" />
    </button>
  </div>
)

export default compose(
  withState('value', 'setValue', ''),
  mapProps(({ value, search, setValue, ...rest }) => ({
    ...rest,
    value,
    search,
    handleChange({ target }) {
      setValue(target.value)
    },
    onKeyPress({ key }) {
      if (key === 'Enter') {
        search(value)
      }
    },
  }))
)(SearchBox)
