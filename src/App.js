import React, { PropTypes } from 'react'

import {
  BrowserRouter as Router,
  Match,
  Link,
} from 'react-router'

import {
  Grid,
  Navbar,
} from 'react-bootstrap'

import { compose, mapProps } from 'recompose'

import Portfolio, {
  AboutSection,
  ContactSection,
  ProjectsSection,
} from './portfolio'

import projects from './projects'

const {
  Header,
  Brand,
} = Navbar

const App = ({ sections }) => (
  <Router basename="/free-code-camp-projects">
    <Grid fluid style={{ height: '100%' }}>
      <Navbar
        fluid
        fixedTop
        style={{
          backgroundColor: '#00695C',
          backgroundImage: 'none',
        }}
      >
        <Header>
          <Brand>
            {
              sections.map(({ href, title }, index) => (
                <span key={href} style={{ color: 'white' }} >
                  { index !== 0 && ' | ' }
                  <a href={`#${href}`} style={{ color: 'white' }} >
                    { title }
                  </a>
                </span>
              ))
            }
          </Brand>
        </Header>
      </Navbar>
      <Match
        exactly pattern="/"
        render={ (props) => ( <Portfolio {...props} sections={ sections } /> ) }
      />
      {
        projects.map((route, i) => (
          <Match
            key={`${route.pattern}-${i}`}
            {...route}
            render={(props) => (
              <div style={{ marginTop: 60, height: '100%' }}>
                <div style={{ marginBottom: 15, marginTop: 10 }}>
                  <Link to="/">Home</Link>
                </div>
                <route.Component {...props} />
              </div>
            )}
          />
        ))
      }
    </Grid>
  </Router>
)

App.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({})),
}

export default compose(
  mapProps(({ ...props }) => ({
    ...props,
    projects,
    sections: [
      {
        Component: AboutSection,
        href: 'about',
        title: 'About',
      },
      {
        Component: ProjectsSection,
        href: 'projects',
        title: 'Projects',
        projects,
      },
      {
        Component: ContactSection,
        href: 'contact',
        title: 'Contact',
      },
    ],
  })),
)(App)
