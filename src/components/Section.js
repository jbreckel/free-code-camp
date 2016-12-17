import React, { PropTypes } from 'react'

import {
  Row,
  PageHeader,
} from 'react-bootstrap'

const Section = ({
  id,
  title,
  children,
}) => (
  <Row
    style={{ paddingTop: 50 }}
    id={ id }
  >
    <PageHeader className="text-center">
      { title } <br />
      <small>
        <i className="fa fa-code" />
      </small>
    </PageHeader>
    <div className="text-center">
      { children }
    </div>
  </Row>
)

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Section
