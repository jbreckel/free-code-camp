import React from 'react'
import PropTypes from 'prop-types'

const Disclaimer = ({ style = {}, project }) => (
  <div
    style={{
      textAlign: 'center',
      marginTop: 10,
      ...style,
    }}
  >
    <p>
      By{' '}
      <a
        href="https://github.com/jbreckel"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: style.color,
          textDecoration: 'underline',
        }}
      >
        jbreckel
      </a>
    </p>
    <p>
      Find the source code of this project on:{' '}
      <a
        href={`https://github.com/jbreckel/free-code-camp-projects/tree/master/src/projects/${project}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: style.color,
          textDecoration: 'underline',
        }}
      >
        github <i className="fa fa-github-square fa-lg" />
      </a>
    </p>
  </div>
)

Disclaimer.propTypes = {
  style: PropTypes.shape(),
  project: PropTypes.string,
}

export default Disclaimer
