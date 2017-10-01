import React from 'react'
import { Row, Col } from 'react-bootstrap'

import UserCell from './UserCell'

const TableRow = ({ user, index }) => (
  <Row style={{ marginBottom: 10, padding: 4 }}>
    <Col md={1}>{index}</Col>
    <Col md={5}>
      <UserCell {...user} />
    </Col>
    <Col md={3}>{user.alltime}</Col>
    <Col md={3}>{user.recent}</Col>
  </Row>
)

export default TableRow
