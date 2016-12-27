import React, { PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'
import { compose, getContext } from 'recompose'

import { Link } from 'react-router'
import { Row, Col } from 'react-bootstrap'

import { Section } from '../components'

const ProjectsSection = ({ projects, appColor }) => (
  <Section id="free-code-camp-projects" title="Free Code Camp Projects">
    <Row style={{ width: '100%' }}>
      {
        projects.map(({ pattern, name, Component }, index) => (
          <Col
            key={ `${pattern}-${name}-${index}`}
            md={ 3 }
            style={{
              padding: 5,
            }}
          >
            <div
              style={{
                height: 200,
                border: 'solid #ccc',
                borderWidth: 2,
                // margin: 5,
                padding: 5,
              }}
            >
              <Link to={ pattern }>
                &ldquo;{ name }&rdquo;<br />
                <div
                  style={{
                    transform: 'scale(0.25)',
                    transformOrigin: '0 0',
                    height: '320%',
                    width: '400%',
                    overflow: 'hidden',
                    color: 'black',
                    marginTop: 5,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: ReactDOMServer.renderToStaticMarkup(
                      <Component disabled appColor={ appColor } />
                    ),
                  }}
                />
              </Link>
            </div>
          </Col>
        ))
      }
    </Row>
  </Section>
)

ProjectsSection.propTypes = {
  appColor: PropTypes.string,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      pattern: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      Component: PropTypes.oneOfType([PropTypes.func]).isRequired,
    })
  ),
}

export default compose(
  getContext({
    appColor: PropTypes.string,
  })
)(ProjectsSection)
