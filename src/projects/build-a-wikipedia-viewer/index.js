import React, { PropTypes } from 'react'

import { compose, mapProps, withState, getContext } from 'recompose'

import fetchJsonp from 'fetch-jsonp'

import { Disclaimer } from '../../components'

import RandomPage from './RandomPage'
import ResultTable from './ResultTable'

import SearchBox from './SearchBox'

const WikipediaViewer = ({ searchForArticles, articles, appColor, loading }) => (
  <div
    style={{
      backgroundColor: appColor,
      minHeight: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        width: '100%',
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RandomPage />
      <SearchBox search={ searchForArticles } />
      {
        loading
          ? <span style={{ color: 'white' }}>Loading...</span>
          : <ResultTable articles={ articles } />
      }
      <Disclaimer
        project="build-a-wikipedia-viewer"
        style={{
          color: 'white',
          border: '1px solid white',
          borderRadius: 4,
          padding: 7,
          margin: 7,
        }}
      />
    </div>
  </div>
)

export default compose(
  getContext({
    appColor: PropTypes.string,
  }),
  mapProps((props) => ({
    ...props,
    fetchSearch(search) {
      return fetchJsonp(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=10&gsrsearch=${search}`, {})
        .then((res) => res.json())
    },
  })),
  withState('loading', 'setLoading', false),
  withState('articles', 'setArticles', []),
  mapProps(({ fetchSearch, setArticles, setLoading, ...props }) => ({
    ...props,
    searchForArticles(search) {
      setLoading(true)
      fetchSearch(search)
      .then(({ query: { pages } }) => setLoading(false, () => setArticles(Object.values(pages))))
    },
  })),
)(WikipediaViewer)
