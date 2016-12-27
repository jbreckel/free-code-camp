import React from 'react'
import { PageHeader } from 'react-bootstrap'
import { compose, withState, lifecycle } from 'recompose'

import './css/weather-icons-wind.min.css'
import './css/weather-icons.min.css'

import WeatherDisplay from './WeatherDisplay'

const ShowMeTheWeather = ({
  weather,
}) => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <PageHeader>
      Free C<i className="wi wi-day-snow-thunderstorm" />de Camp Weather App
    </PageHeader>
    {
      // as long as the api has no values, weather is an empty object
      Object.keys(weather).length === 0
      ? 'Loading...'
      : (
        <WeatherDisplay {...{ weather }} />
      )
    }
  </div>
)

const calculateTemp = ({ temp, currentFormat = 'K', newFormat }) => {
  if (currentFormat === 'C') {
    if (newFormat === 'F') {
      return ((9 / 5) * temp) + 32
    } else if (newFormat === 'K') {
      return temp + 273
    }
  }
  if (currentFormat === 'F') {
    if (newFormat === 'C') {
      return (5 / 9) * (temp - 32)
    } else if (newFormat === 'K') {
      return ((5 / 9) * (temp - 32)) + 273
    }
  }
  if (currentFormat === 'K') {
    if (newFormat === 'C') {
      return temp - 273
    } else if (newFormat === 'F') {
      return ((9 / 5) * (temp - 273)) + 32
    }
  }
  return temp
}

export default compose(
  withState('weather', 'setWeather', {}),
  lifecycle({
    componentWillMount() {
      fetch('http://ipinfo.io/json')
        .then((res) => res.json())
        .then(({ loc }) => loc.split(','))
        .then(([lat, lon]) => fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=20da7b5f28996aa4f8e4d26ccd6f49ba`).then((res) => res.json())
        )
        .then((weather) => {
          this.props.setWeather({
            ...weather,
            // we only want to see the first weather
            weather: weather.weather[0],
            // precalculate different formats
            temp: {
              K: weather.main.temp.toFixed(2),
              C: calculateTemp({ temp: weather.main.temp, newFormat: 'C' }).toFixed(2),
              F: calculateTemp({ temp: weather.main.temp, newFormat: 'F' }).toFixed(2),
            },
          })
        })
    },
  }),
)(ShowMeTheWeather)
