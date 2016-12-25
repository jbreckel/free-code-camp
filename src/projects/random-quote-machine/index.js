import React from 'react'

import { Grid } from 'react-bootstrap'

import { compose, mapProps, withState, lifecycle } from 'recompose'

import Blockquote from './Blockquote'

const colors = [
  '#E91E63',
  '#F44336',
  '#FF5722',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#00BCD4',
  '#8BC34A',
  '#FF9800',
]

const RandomQuoteMachine = ({ quote, author, updateQuote, color }) => (
  <Grid
    fluid
    style={{
      backgroundColor: color,
      height: '100%',
    }}
  >
    <div
      style={{
        width: '50%',
        margin: '100px auto 0px',
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
      }}
    >
      <Blockquote
        style={{
          hyphens: 'auto',
          color,
        }}
        author={ author }
      >
        { quote }
      </Blockquote>
      <div
        style={{
          width: '90%',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px auto',
        }}
      >
        <a
          href={
            `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text= ${
              encodeURIComponent(`${`${quote} \u2014 ${author}`}`)
            }`
          }
          target="_blank" rel="noopener noreferrer" style={{ color }}
        >
          <i className="fa fa-twitter-square fa-2x" />
        </a>
        <button
          className="btn" style={{ color: 'white', backgroundColor: color }}
          onClick={ updateQuote }
        >
          new quote
        </button>
      </div>
    </div>
  </Grid>
)

export default compose(
  mapProps(({ ...props }) => ({
    ...props,
    getRandomQuote(cb) {
      fetch('https://andruxnet-random-famous-quotes.p.mashape.com/', {
        headers: {
          'X-Mashape-Key': 'vhvT6TZm3tmshPP8WIzgci7jzeuKp1fp15OjsnlnKicHDcyLiy',
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      })
      .then((res) => res.json())
      .then(cb)
    },
  })),
  withState('quote', 'setQuote', {}),
  mapProps(({ getRandomQuote, setQuote, quote, ...props }) => ({
    ...props,
    ...quote,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
    updateQuote() {
      const refreshQuote = () => {
        getRandomQuote((newQuote) => {
          if (newQuote.quote === quote.quote) {
            refreshQuote()
          } else {
            setQuote(newQuote)
          }
        })
      }
      refreshQuote()
    },
  })),
  lifecycle({
    componentDidMount() {
      this.props.updateQuote()
    },
  }),
)(RandomQuoteMachine)
