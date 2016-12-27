import React from 'react'

import { compose, mapProps, withState } from 'recompose'

import { DropdownButton, MenuItem } from 'react-bootstrap'

const WeatherDisplay = ({
  weather: { temp, name, sys: { country }, weather: { main, description }, wind },
  iconCls, windIconCls, windSpeedIconCls,
  tempFormat, tempUnits, setTempFormat,
}) => (
  <div>
    <h3>{ name }, { country }</h3>
    <i className={ `${iconCls} fa-3x` } />
    <div
      style={{
        margin: 5,
      }}
    >
      { temp[tempFormat] }{' '}
      <DropdownButton
        id="temp-select-dropdown"
        title={ tempUnits[tempFormat] }
        onSelect={
          (eventKey) => setTempFormat(eventKey)
        }
      >
        {
          Object.keys(tempUnits).map((key) => (
            <MenuItem key={ key } eventKey={ key }>{ tempUnits[key] }</MenuItem>
          ))
        }
      </DropdownButton>
    </div>
    <p style={{ fontSize: '140%' }}>
      { main }
    </p>
    <p>
      { description }
    </p>
    <div>
      Wind:
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <i style={{ margin: 4 }} className={ `${windIconCls} fa-3x` } />
        {' '}
        ({ wind.deg }°)
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <i style={{ margin: 4 }} className={ `${windSpeedIconCls} fa-3x` } />
        {' '}
        ({ wind.speed } bft)
      </div>
    </div>
  </div>
)

export default compose(
  mapProps((props) => ({
    ...props,
    tempUnits: {
      C: '°C',
      K: 'K',
      F: '°F',
    },
  })),
  mapProps(({ weather, ...rest }) => ({
    ...rest,
    weather,
    iconCls: `wi wi-owm-${weather.weather.id}`,
    windIconCls: `wi wi-wind towards-${weather.wind.deg.toFixed(0)}-deg`,
    windSpeedIconCls: `wi wi-wind wi-wind-beaufort-${weather.wind.speed.toFixed(0)}`,
  })),
  withState('tempFormat', 'setTempFormat', 'C'),
  mapProps(({ tempFormat, setTempFormat, tempUnits, ...rest }) => ({
    ...rest,
    tempFormat,
    tempUnits,
    setTempFormat(newFormat) {
      if (Object.keys(tempUnits).includes(newFormat)) {
        setTempFormat(newFormat)
      }
    },
  })),
)(WeatherDisplay)
