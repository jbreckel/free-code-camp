import React from 'react'

import { compose, mapProps, withState } from 'recompose'

import SearchResult from './SearchResult'

const ResultTable = ({ articles, hover, setHover }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {
      articles.map((page) => <SearchResult key={ page.pageid } {...{ page, hover, setHover }} />)
    }
  </div>
)

export default compose(
  withState('hover', 'setHover', null),
  // mapProps(({ hover, setHover, ...rest }) => ({
  //   ...rest,
  //   hover,
  //   toggleHover(newId) {
  //     setHover(newId)
  //   },
  // })),
)(ResultTable)
