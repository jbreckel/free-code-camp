import React from 'react'

import { compose, getContext, mapProps, withState } from 'recompose'

import substyle from 'substyle'

import { add } from './calculate'

const Col = ({ children }) => (
  <div
    style={{
      // width: '20%',
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
    }}
  >
    { children }
  </div>
)
const Row = ({ children }) => (
  <div
    style={{
      // display: 'flex',
      // alignItems: 'stretch',
      // width: '100%',
    }}
  >
    { children }
  </div>
)
const Tile = ({ children, double, sbstyle }) => (
  <button
    style={{
      ...sbstyle('tile').style,
      width: double ? sbstyle('tile').style.width * 2 : sbstyle('tile').style.width,
    }}
  >
    { children }
  </button>
)

const JavaScriptCalculator = ({ appColor, style, result, ...props }) => (
  <div
    style={{
      ...style('outer').style,
      backgroundColor: appColor,
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
        <Col>
          <Row>
            <Tile sbstyle={ style } >7</Tile>
            <Tile sbstyle={ style } >8</Tile>
            <Tile sbstyle={ style } >9</Tile>
          </Row>
          <Row>
            <Tile sbstyle={ style } >4</Tile>
            <Tile sbstyle={ style } >5</Tile>
            <Tile sbstyle={ style } >6</Tile>
          </Row>
          <Row>
            <Tile sbstyle={ style } >1</Tile>
            <Tile sbstyle={ style } >2</Tile>
            <Tile sbstyle={ style } >3</Tile>
          </Row>
          <Row>
            <Tile double sbstyle={ style } >0</Tile>
            <Tile sbstyle={ style } >.</Tile>
          </Row>
        </Col>
        <Col>
          <Row>
            <Tile sbstyle={ style } >+</Tile>
          </Row>
          <Row>
            <Tile sbstyle={ style } >-</Tile>
          </Row>
          <Row>
            <Tile sbstyle={ style } >*</Tile>
          </Row>
          <Row>
            <Tile sbstyle={ style } >/</Tile>
          </Row>
        </Col>
        {/* <input type="button" value="1" onClick="document.calculator.ans.value+='1'" />
        <input type="button" value="2" onClick="document.calculator.ans.value+='2'" />
        <input type="button" value="3" onClick="document.calculator.ans.value+='3'" />
        <input type="button" value="+" onClick="document.calculator.ans.value+='+'" />
        <br />
        <input type="button" value="4" onClick="document.calculator.ans.value+='4'" />
        <input type="button" value="5" onClick="document.calculator.ans.value+='5'" />
        <input type="button" value="6" onClick="document.calculator.ans.value+='6'" />
        <input type="button" value="-" onClick="document.calculator.ans.value+='-'" />
        <br />
        <input type="button" value="7" onClick="document.calculator.ans.value+='7'" />
        <input type="button" value="8" onClick="document.calculator.ans.value+='8'" />
        <input type="button" value="9" onClick="document.calculator.ans.value+='9'" />
        <input type="button" value="*" onClick="document.calculator.ans.value+='*'" />
        <input type="button" value="/" onClick="document.calculator.ans.value+='/'" />
        <br />
        <input type="button" value="0" onClick="document.calculator.ans.value+='0'" />
        <input type="reset" value="Reset" />
        <input type="button" value="="
         onClick="document.calculator.ans.value=eval(document.calculator.ans.value)" /> */}
      </div>
      <pre>
        {
          JSON.stringify({ ...props, style }, null, 2)
        }
      </pre>
    </div>
  </div>
)

const defaultStyles = {
  outer: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  inner: {
    width: '100%',
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
    margin: '0 4px 10px 8px',
    height: 40,
    width: 50,
    boxShadow: '0px 3px 0px 0px #222121, inset -1px -3px 10px 1px #515151',
    outline: 'none',
  },
}

export default compose(
  getContext({
    appColor: () => null,
  }),
  substyle(defaultStyles, (props) => {
    console.log(props)
  }),
  withState('result', 'setResult', 0),
)(JavaScriptCalculator)
