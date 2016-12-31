import React from 'react'

import { compose, withState, mapProps, lifecycle, getContext } from 'recompose'

import { Disclaimer } from '../../components'

import fetchUserWithStream from './fetchUserWithStream'

import UserRow from './UserRow'

const defaultChannels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'juliusbreckel',
]

const TwitchAPIApp = ({ appColor, channels, filters, setFilter, filter }) => (
  <div
    style={{
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      backgroundColor: appColor,
    }}
  >
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p style={{ height: 20 }} />
      <div
        style={{
          color: 'white',
        }}
      >
        {
          filters.map((f) => (
            <button
              key={ f }
              style={{
                border: 'none',
                margin: 5,
                textDecoration: filter === f ? 'underline' : 'none',
                color: 'white',
                backgroundColor: appColor,
              }}
              onClick={ () => setFilter(f) }
            >
              { f }
            </button>
          ))
        }
      </div>
      <div
        style={{
          width: '40%',
        }}
      >
        {
          channels.map((channel) => (
            <UserRow key={ channel.user.id } {...channel} />
          ))
        }
      </div>
      <Disclaimer
        project="use-the-twitchtv-json-api"
        style={{
          color: 'white',
          border: '1px solid white',
          borderRadius: 4,
          padding: 7,
          marginTop: 20,
        }}
      />
    </div>
  </div>
)

export default compose(
  getContext({
    appColor: () => null,
  }),
  withState('channels', 'setChannels', []),
  mapProps(({ channels, setChannels, ...rest }) => ({
    ...rest,
    channels,
    addChannel(channel) {
      setChannels([...channels, channel])
    },
    removeChannel(channel) {
      setChannels(channels.filter((c) => c !== channel))
    },
  })),
  lifecycle({
    componentWillMount() {
      defaultChannels.forEach((channel) => {
        fetchUserWithStream(channel)
        .then((full) => {
          this.props.addChannel(full)
        })
      })
    },
  }),
  withState('filter', 'setFilter', 'all'),
  mapProps(({ filter, setFilter, filters = ['all', 'online', 'offline'], ...rest }) => ({
    ...rest,
    filter,
    filters,
    setFilter(newFilter) {
      setFilter(filters.includes(newFilter) ? newFilter : filter)
    },
  })),
  mapProps(({ filter, channels, ...rest }) => ({
    ...rest,
    filter,
    channels: (() => {
      switch (filter) {
        case 'online':
          return channels.filter(({ stream: { stream } }) => !!stream)
        case 'offline':
          return channels.filter(({ stream: { stream } }) => !stream)
        case 'all':
        default:
          return channels
      }
    })(),
  }))
)(TwitchAPIApp)
