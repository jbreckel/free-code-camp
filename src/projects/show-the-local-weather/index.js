import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'
import { compose, withState, lifecycle } from 'recompose'

import { Disclaimer } from '../../components'

import './css/weather-icons-wind.min.css'
import './css/weather-icons.min.css'

import WeatherDisplay from './WeatherDisplay'

import bftCalculator from './bftCalculator'

const ShowMeTheWeather = ({ weather }) => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <PageHeader>
      Free C<i className="wi wi-day-snow-thunderstorm" />de Camp Weather App
    </PageHeader>
    {// as long as the api has no values, weather is an empty object
    Object.keys(weather).length === 0 ? (
      'Loading...'
    ) : (
      <WeatherDisplay {...{ weather }} />
    )}
    <div style={{ margin: 15 }}>
      <a
        href="https://www.wunderground.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>
          Weather data provided by:<br />
          <img
            src="https://icons.wxug.com/logos/JPG/wundergroundLogo_4c_horz.jpg"
            alt="Weather Underground"
            style={{ width: 120 }}
          />
        </p>
      </a>
      <Disclaimer style={{ margin: 15 }} project="show-the-local-weather" />
    </div>
  </div>
)

export default compose(
  withState('weather', 'setWeather', {}),
  lifecycle({
    componentDidMount() {
      fetch('https://ipinfo.io/json')
        .then(res => res.json())
        .then(({ loc }) => loc.split(','))
        .then(([lat, lon]) =>
          fetch(
            `https://api.wunderground.com/api/d8483e016960a875/conditions/q/${lat},${lon}.json`
          )
            .then(res => res.json())
            .then(({ current_observation: r }) => r)
        )
        .then(weather => {
          const {
            wind_mph,
            wind_degrees,
            observation_location: { city, country_iso3166: country },
            temp_c,
            temp_f,
            weather: description,
            icon,
          } = weather
          // wunderground
          this.props.setWeather({
            icon,
            description,
            wind: {
              ...bftCalculator(wind_mph),
              deg: wind_degrees,
            },
            location: {
              city,
              country,
            },
            temp: {
              C: temp_c,
              F: temp_f,
            },
          })
        })
    },
  })
)(ShowMeTheWeather)

ShowMeTheWeather.propTypes = {
  weather: {
    icon: PropTypes.string,
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
  },
}
