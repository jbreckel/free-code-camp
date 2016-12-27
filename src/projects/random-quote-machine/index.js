import React, { PropTypes } from 'react'

import { Grid } from 'react-bootstrap'

import { compose, mapProps, withState, lifecycle } from 'recompose'

import Blockquote from './Blockquote'

const colors = [
  '#479e37',
  '#37479e',
  '#9e3747',
  '#379e8e',
  '#232e65',
  '#5c6dc6',
  '#c6b55c',
  '#5ca2c6',
  '#805cc6',
  '#a2c65c',
  '#c6805c',
  '#3f8b31',
  '#c65c6d',
  '#5cc6b5',
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

RandomQuoteMachine.propTypes = {
  quote: PropTypes.string,
  author: PropTypes.string,
  updateQuote: PropTypes.func,
  color: PropTypes.string,
}

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
  mapProps(({ disabled, quote, author, color, appColor, ...rest }) => ({
    ...rest,
    disabled,
    quote: disabled ? 'I feel the need - the need for speed!' : quote,
    author: disabled ? 'Top Gun' : author,
    color: disabled ? appColor : color,
  })),
)(RandomQuoteMachine)
