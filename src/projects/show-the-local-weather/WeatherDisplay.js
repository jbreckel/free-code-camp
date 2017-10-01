import React from 'react'
import PropTypes from 'prop-types'

import { compose, mapProps, withState } from 'recompose'

import { DropdownButton, MenuItem } from 'react-bootstrap'

import WindDisplay from './WindDisplay'

const WeatherDisplay = ({
  location: { city, country },
  description,
  temp,
  iconCls,
  tempFormat,
  tempUnits,
  setTempFormat,
  wind,
}) => (
  <div>
    <h3>
      {city}, {country}
    </h3>
    <i style={{ margin: 7 }} className={`${iconCls} fa-3x`} />
    <div
      style={{
        margin: 5,
      }}
    >
      {temp[tempFormat]}{' '}
      <DropdownButton
        id="temp-select-dropdown"
        title={tempUnits[tempFormat]}
        onSelect={eventKey => setTempFormat(eventKey)}
      >
        {Object.keys(tempUnits).map(key => (
          <MenuItem key={key} eventKey={key}>
            {tempUnits[key]}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
    <p style={{ fontSize: '120%' }}>{description}</p>
    <WindDisplay wind={wind} />
  </div>
)

export default compose(
  mapProps(props => ({
    ...props,
    tempUnits: {
      C: '°C',
      F: '°F',
    },
  })),
  mapProps(({ weather, ...rest }) => ({
    ...rest,
    ...weather,
    iconCls: `wi wi-wu-${weather.icon}`,
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
  }))
)(WeatherDisplay)

WeatherDisplay.propTypes = {
  description: PropTypes.string,
  wind: {
    speed: PropTypes.number,
    deg: PropTypes.number,
    desc: PropTypes.string,
  },
  location: {
    city: PropTypes.string,
    country: PropTypes.string,
  },
  temp: {
    C: PropTypes.number,
    F: PropTypes.number,
  },
  iconCls: PropTypes.string,
  tempFormat: PropTypes.string,
  tempUnits: {
    C: PropTypes.string,
    F: PropTypes.string,
  },
  setTempFormat: PropTypes.func,
}
