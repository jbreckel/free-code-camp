import React from 'react'
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'

import {
  compose,
  lifecycle,
  withState,
} from 'recompose'

import { Disclaimer } from '../../components'

import demo from './demo.json'

import TableRow from './TableRow'

const CamperLeaderboard = ({ data, mode, setMode }) => (
  <div className="wrapper">
    <Grid fluid style={{ height: '100%' }} className="container">
      <Row className="header-row">
        <Col md={1}>
          #
        </Col>
        <Col md={5}>
          User
        </Col>
        <Col md={3}>
          Alltime
          { mode !== 'alltime' && (
            <button onClick={() => setMode('alltime')}> V </button>
          )}
        </Col>
        <Col md={3}>
          Recent
          { mode !== 'recent' && (
            <button onClick={() => setMode('recent')}> V </button>
          )}
        </Col>
      </Row>
      {
        data.map((user, index) => (
          <TableRow
            {...{
              key: user.username,
              index: index + 1,
              user,
            }}
          />
        ))
      }
    </Grid>
    <Disclaimer
      project="camper-leaderboard"
    />
  </div>
)

const fetchData = (mode, setData) => {
  fetch(`https://fcctop100.herokuapp.com/api/fccusers/top/${mode}`)
    .then((res) => res.json())
    .then((data) => setData(data))
}

export default compose(
  withState('mode', 'setMode', 'alltime' ), // recent
  withState('data', 'setData', ({ disabled }) => (disabled ? demo : [])), // recent
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.mode !== this.props.mode) {
        fetchData(nextProps.mode, nextProps.setData)
      }
    },
    componentDidMount() {
      const { mode, setData } = this.props
      fetchData(mode, setData)
    },
  }),
)(CamperLeaderboard)
