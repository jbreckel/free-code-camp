import React from 'react'

import { Col } from 'react-bootstrap'

import { Blockquote } from '../../components'

const ListRow = ({ year, msg }) => (
  <li>
    <strong>{year}</strong> &mdash; {msg}
  </li>
)

const ListComponent = ({ listData }) => (
  <ul>
    {listData.map(item => <ListRow key={item.year + item.msg} {...item} />)}
  </ul>
)

const BodyComponent = ({ title, listData, quote, quoteAuthor, moreInfo }) => (
  <Col md={10} mdOffset={1}>
    <h3>{title}</h3>
    <ListComponent listData={listData} />
    <Blockquote
      style={{
        hyphens: 'auto',
      }}
      author={quoteAuthor}
    >
      {quote}
    </Blockquote>
    <h3>{moreInfo}</h3>
  </Col>
)

export default BodyComponent
