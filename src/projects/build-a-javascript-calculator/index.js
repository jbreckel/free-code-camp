import React from 'react'

import { compose, getContext, withState, withHandlers } from 'recompose'

import substyle from 'substyle'

import { Disclaimer } from '../../components'

import './style.css'

import calculate from './calculate'

const Screen = ({ children, double, sbstyle }) => (
  <button { ...sbstyle('screen') }>
    { children }
  </button>
)
const Tile = ({ children, double, sbstyle, onClick }) => (
  <button
    onClick={ onClick }
    style={{
      ...sbstyle('tile').style,
      width: double
        ? (sbstyle('tile').style.width * 2) + 15
        : sbstyle('tile').style.width,
    }}
  >
    { children }
  </button>
)

const JavaScriptCalculator = ({
  appColor, style, result,
  setOperator,
  value, addToValue,
  triggerCalculation,
  clear,
}) => (
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
      {/* body */}
      <div
        style={{
          backgroundColor: 'white',
          // width: 300,
          padding: 10,
        }}
      >
        <Tile sbstyle={ style } onClick={ clear }>C</Tile>
        <Screen sbstyle={ style }>{ result }</Screen>

        <Tile sbstyle={ style } onClick={ () => addToValue('7') }>7</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('8') }>8</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('9') }>9</Tile>
        <Tile sbstyle={ style } onClick={ () => setOperator('+') }>+</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('4') }>4</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('5') }>5</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('6') }>6</Tile>
        <Tile sbstyle={ style } onClick={ () => setOperator('-') }>-</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('1') }>1</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('2') }>2</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('3') }>3</Tile>
        <Tile sbstyle={ style } onClick={ () => setOperator('/') }>/</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('0') }>0</Tile>
        <Tile sbstyle={ style } onClick={ () => addToValue('.') }>.</Tile>
        <Tile sbstyle={ style } onClick={ triggerCalculation }>=</Tile>
        <Tile sbstyle={ style } onClick={ () => setOperator('*') }>*</Tile>
      </div>
    </div>
    <Disclaimer
      project="build-a-javascript-calculator"
      style={{
        color: 'white',
        border: '1px solid white',
        borderRadius: 4,
        padding: 7,
        margin: 7,
      }}
    />
  </div>
)

const defaultStyles = {
  outer: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inner: {
    width: 260,
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    color: 'white',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#3a3a3a',
    margin: 5,
    height: 40,
    width: 50,
    // boxShadow: '0px 3px 0px 0px #222121, inset -1px -3px 10px 1px #515151',
    outline: 'none',
  },
  screen: {
    color: 'black',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#ccc',
    margin: 5,
    padding: 5,
    height: 40,
    width: 170,
    textAlign: 'right',
    outline: 'none',
  },
}

export default compose(
  getContext({
    appColor: () => null,
  }),
  substyle(defaultStyles),
  withState('result', 'setResult', 0),
  withState('value', 'setValue', 0),
  withState('secondValue', 'setSecondValue', 0),
  withState('operator', 'setOperator', null),
  withHandlers({
    addToValue: ({ setValue, value, result, operator, secondValue, setSecondValue, setResult }) =>
      (digit) => {
        if (operator === null) {
          if ( digit === '.' && value.indexOf('.') !== -1 ) {
            setValue(value, () => setResult(result))
            return
          }
          const nVal = value === 0 ? digit : `${value}${digit}`
          const setVal = nVal.indexOf('00') === 0 ? value : nVal
          setValue(setVal, () => setResult(setVal))
        } else {
          if ( digit === '.' && secondValue.indexOf('.') !== -1 ) {
            setSecondValue(secondValue, () => setResult(result))
            return
          }
          const nVal = secondValue === 0 ? digit : `${secondValue}${digit}`
          const setVal = nVal.indexOf('00') === 0 ? secondValue : nVal
          const resSplit = result.split(' ')
          const setRes = `${resSplit[0]} ${resSplit[1]} ${setVal}`
          setSecondValue(setVal, () => setResult(setRes))
        }
      },
    triggerCalculation:
    ({ operator, value, secondValue, setSecondValue, setOperator, setValue, setResult }) =>
      () => {
        if ( !operator || !value || !secondValue ) return
        const nVal = calculate[operator](Number(value), Number(secondValue))
        setValue(nVal, () => setSecondValue('', () => setResult(nVal, () => setOperator(null))))
      },
    clear: ({ setOperator, setValue, setResult, setSecondValue }) =>
      () => {
        setValue('', () => setSecondValue('', () => setResult('', () => setOperator(null))))
      },
    setOperator: ({ operator, result, setResult, setOperator, secondValue }) => (o) => {
      if ( result && !secondValue ) {
        setOperator(o, () => {
          if ( o !== null ) {
            let newRes = `${result} ${o} `
            if ( operator !== null ) {
              newRes = result.replace(operator, o)
            }
            setResult(newRes)
          }
        })
      }
    },
  }),
)(JavaScriptCalculator)
