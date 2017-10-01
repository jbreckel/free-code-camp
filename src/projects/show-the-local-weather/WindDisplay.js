import React from 'react'
import PropTypes from 'prop-types'

import { compose, mapProps } from 'recompose'

const WindDisplay = ({
  wind: { deg, speed, desc },
  windIconCls,
  windSpeedIconCls,
}) => (
  <div>
    Wind: {desc}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <i style={{ margin: 4 }} className={`${windIconCls} fa-3x`} /> ({deg}°)
      <i style={{ margin: 4 }} className={`${windSpeedIconCls} fa-3x`} /> ({speed}{' '}
      bft)
    </div>
  </div>
)

export default compose(
  mapProps(({ wind, ...rest }) => ({
    ...rest,
    wind,
    windIconCls: `wi wi-wind towards-${wind.deg.toFixed(0)}-deg`,
    windSpeedIconCls: `wi wi-wind wi-wind-beaufort-${wind.speed.toFixed(0)}`,
  }))
)(WindDisplay)

WindDisplay.propTypes = {
  wind: {
    speed: PropTypes.number,
    deg: PropTypes.number,
    desc: PropTypes.string,
  },
  windIconCls: PropTypes.string,
  windSpeedIconCls: PropTypes.string,
}
