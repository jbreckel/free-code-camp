import React from 'react'

import { compose, getContext } from 'recompose'

import substyle from 'substyle'

import { ContainerDarkStyle, DisclaimerOnDarkStyle } from '../../style'
import { Disclaimer } from '../../components'

const TicTacToe = ({ appColor, style }) => (
  <div
    style={{
      ...style('outer').style,
      background: appColor,
      backgroundSize: 'cover',
    }}
  >
    <div
      {...{ ...style('inner') }}
    >
      content

      <Disclaimer
        {...style('disclaimer')}
        project="build-a-pomodoro-clock"
      />
    </div>
  </div>
)

const defaultStyles = {
  ...ContainerDarkStyle,
  disclaimer: DisclaimerOnDarkStyle,
}


export default compose(
  getContext({
    appColor: () => null,
  }),
  substyle(defaultStyles),
)(TicTacToe)
