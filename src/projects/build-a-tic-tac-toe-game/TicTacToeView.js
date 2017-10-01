import React from 'react'

import substyle from 'substyle'

import { Disclaimer } from '../../components'

import styles from './styles'

const TicTacToe = ({
  appColor,
  style,
  selectMark,
  onPlayerClick,
  board,
  message,
  player,
  currentPlayer,
  win,
  reset,
  gameActive,
}) => (
  <div
    style={{
      ...style('outer').style,
      background: appColor,
      backgroundSize: 'cover',
    }}
  >
    <div {...{ ...style('inner') }}>
      <button {...style('reset')} onClick={reset}>
        Restart
      </button>
      {player && <h4>Your mark: {player}</h4>}
      <h2>{message}</h2>
      {!player && (
        <div style={{ margin: 20 }}>
          <button {...style('markSelect')} onClick={() => selectMark('X')}>
            {' '}
            X{' '}
          </button>
          <button {...style('markSelect')} onClick={() => selectMark('O')}>
            {' '}
            O{' '}
          </button>
        </div>
      )}
      <div {...style('board')}>
        {board.map((tile, index) => (
          <button
            key={`board-${tile}-${index}`}
            disabled={!gameActive}
            {...style(
              [
                'field',
                `${index}`,
                win && win.findIndex(e => index === e) !== -1 && 'win',
              ].filter(i => !!i)
            )}
            onClick={() => onPlayerClick(index)}
          >
            {tile}
          </button>
        ))}
      </div>
      {win && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 7,
            color: 'red',
            border: '1px solid red',
            borderRadius: 4,
            padding: 7,
            position: 'absolute',
            backgroundColor: 'white',
          }}
        >
          <p>{message}</p>
        </div>
      )}
      <Disclaimer {...style('disclaimer')} project="build-a-pomodoro-clock" />
    </div>
  </div>
)

export default substyle(styles)(TicTacToe)
