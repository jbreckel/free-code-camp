import React from 'react'

import {
  compose,
  mapProps,
  withState,
  withHandlers,
  getContext,
} from 'recompose'

import substyle from 'substyle'

import moment from 'moment'

import { ContainerDarkStyle, DisclaimerOnDarkStyle } from '../../style'
import { Disclaimer } from '../../components'

const PomodoroClock = ({
  display,
  style,
  appColor,
  toggleTimer,
  timer,
  status,
  increaseBreakLength,
  decreaseBreakLength,
  increaseSessionLength,
  decreaseSessionLength,
  switchStatus,
  isSession,
  sessionLength,
  breakLength,
}) => (
  <div
    style={{
      ...style('outer').style,
      background: appColor,
      backgroundSize: 'cover',
    }}
  >
    <div {...{ ...style('inner') }}>
      <div {...style('clockWrapper')}>
        <div /* Controls */
          style={{
            display: 'flex',
          }}
        >
          <div {...style('control')}>
            <div {...style('controlText')}>Break</div>
            <div>
              <button {...style('button')} onClick={increaseBreakLength}>
                +
              </button>{' '}
              {breakLength}{' '}
              <button {...style('button')} onClick={decreaseBreakLength}>
                -
              </button>
            </div>
          </div>
          <div {...style('buttons')}>
            <button {...style('switch')} onClick={switchStatus}>
              Switch
            </button>
            <button {...style('switch')} onClick={toggleTimer}>
              {timer ? 'Pause' : 'Start'}
            </button>
          </div>
          <div {...style('control')}>
            <div {...style('controlText')}>Session</div>
            <div>
              <button {...style('button')} onClick={increaseSessionLength}>
                +
              </button>{' '}
              {sessionLength}{' '}
              <button {...style('button')} onClick={decreaseSessionLength}>
                -
              </button>
            </div>
          </div>
        </div>
        <div {...style('clock')}>
          {status.toUpperCase()}
          <br />
          {display}
        </div>
      </div>
      <Disclaimer {...style('disclaimer')} project="build-a-pomodoro-clock" />
    </div>
  </div>
)

const defaultStyles = {
  ...ContainerDarkStyle,
  disclaimer: DisclaimerOnDarkStyle,
  clockWrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    height: 200,
    width: 200,
    border: '1px solid white',
    borderRadius: 100,
    margin: 10,
    // verticalAlign: 'middle',
    // lineHeight: 100,
  },
  control: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    margin: 5,
  },
  controlText: {
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: 20,
    color: 'black',
  },
  switch: {
    border: 'none',
    backgroundColor: '#555',
    borderRadius: 10,
    width: 70,
    padding: 3,
    margin: 2,
  },
  buttons: {
    // width: 70,
  },
}

const formatTime = time => {
  const pad = (i, length = 2) => `00000${i}`.substr(-length)
  const dur = moment.duration(time)
  return `
  ${dur.hours() === 0 ? '' : `${pad(dur.hours())}:`}
  ${pad(dur.minutes())}:
  ${pad(dur.seconds())}:
  ${pad(dur.milliseconds(), 3)}
  `
    .replace(/\n/g, '')
    .replace(/ /g, '')
}

export default compose(
  getContext({
    appColor: () => null,
  }),
  substyle(defaultStyles),
  withState('timer', 'setTimer', null),
  withState('status', 'setStatus', 'Session'), // Session or Break
  withHandlers({
    isSession: ({ status }) => () => status === 'Session',
  }),
  withState('sessionLength', 'setSessionLength', 25),
  withState('breakLength', 'setBreakLength', 5),
  withState(
    'value',
    'setValue',
    ({ sessionLength, breakLength, isSession }) => ({
      minutes: isSession() ? sessionLength : breakLength,
    })
  ),
  withHandlers({
    switchStatus: ({
      isSession,
      setStatus,
      breakLength,
      sessionLength,
      setValue,
    }) => () => {
      const newValue = { minutes: isSession() ? breakLength : sessionLength }
      setStatus(isSession() ? 'Break' : 'Session', () => setValue(newValue))
      return newValue
    },
  }),
  withHandlers({
    setSessionLength: ({
      setSessionLength,
      setValue,
      isSession,
    }) => newSessionLength => {
      if (newSessionLength > 0) {
        setSessionLength(newSessionLength, () => {
          if (isSession()) {
            setValue({ minutes: newSessionLength })
          }
        })
      }
    },
    setBreakLength: ({
      setBreakLength,
      setValue,
      isSession,
    }) => newBreakLength => {
      if (newBreakLength > 0) {
        setBreakLength(newBreakLength, () => {
          if (!isSession()) {
            setValue({ minutes: newBreakLength })
          }
        })
      }
    },
  }),
  withHandlers({
    increaseSessionLength: ({ sessionLength, setSessionLength }) => () =>
      setSessionLength(sessionLength + 1),
    decreaseSessionLength: ({ sessionLength, setSessionLength }) => () =>
      setSessionLength(sessionLength - 1),
    increaseBreakLength: ({ breakLength, setBreakLength }) => () =>
      setBreakLength(breakLength + 1),
    decreaseBreakLength: ({ breakLength, setBreakLength }) => () =>
      setBreakLength(breakLength - 1),
  }),
  withHandlers({
    toggleTimer: ({ setTimer, timer, value, setValue, switchStatus }) => () => {
      if (timer) {
        clearInterval(timer)
        setTimer(null)
        return
      }
      let endTime = moment().add(value)

      const timerFunc = () => {
        const now = moment()
        if (now < endTime) {
          const duration = moment.duration(endTime - now)
          const time = {
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
            milliseconds: duration.milliseconds(),
          }
          setValue(time)
        } else {
          endTime = moment().add(switchStatus())
        }
      }

      timerFunc()
      setTimer(setInterval(timerFunc, Math.floor(Math.random() * 42)))
    },
  }),
  mapProps(({ value, ...props }) => ({
    ...props,
    value,
    display: formatTime(value),
  }))
)(PomodoroClock)
