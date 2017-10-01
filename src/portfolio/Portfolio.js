import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from 'react-bootstrap'

const Portfolio = ({ sections }) => (
  <Grid fluid>
    {sections.map(({ Component, ...rest }) => (
      <Component key={`${rest.href}-component`} {...rest} />
    ))}
  </Grid>
)

Portfolio.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Portfolio
