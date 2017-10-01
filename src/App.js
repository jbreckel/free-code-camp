import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Match, Link } from 'react-router'

import { Grid, Navbar } from 'react-bootstrap'

import { compose, mapProps, withContext, lifecycle } from 'recompose'

import Portfolio, {
  AboutSection,
  ContactSection,
  ProjectsSection,
} from './portfolio'

import projects from './projects'

const { Header, Brand } = Navbar

const MyHeader = compose(
  lifecycle({
    componentWillReceiveProps() {
      const { hash } = window.location
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
  })
)(({ sections }) => (
  <Header>
    <Brand>
      {sections.map(({ href, title }, index) => (
        <span key={href} style={{ color: 'white' }}>
          {index !== 0 && ' | '}
          <Link to={`/#${href}`} style={{ color: 'white' }}>
            {title}
          </Link>
        </span>
      ))}
    </Brand>
  </Header>
))

const App = ({ sections, appColor }) => (
  <Router basename="/free-code-camp-projects">
    <Grid fluid style={{ height: '100%' }}>
      <Navbar
        fluid
        fixedTop
        style={{
          backgroundColor: appColor,
          backgroundImage: 'none',
        }}
      >
        <MyHeader sections={sections} />
      </Navbar>
      <Match
        exactly
        pattern="/"
        render={props => <Portfolio {...props} sections={sections} />}
      />
      {projects.map((route, i) => (
        <Match
          key={`${route.pattern}-${i}`}
          {...route}
          render={props => (
            <div style={{ marginTop: 60, height: '100%' }}>
              <div style={{ marginBottom: 15, marginTop: 10 }}>
                <Link to="/">Home</Link>
              </div>
              <route.Component {...props} />
            </div>
          )}
        />
      ))}
    </Grid>
  </Router>
)

App.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({})),
  appColor: PropTypes.string,
}

export default compose(
  mapProps(props => ({
    ...props,
    appColor: '#00695C',
  })),
  withContext({ appColor: PropTypes.string }, ({ appColor }) => ({ appColor })),
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
        Component: ContactSection,
        href: 'contact',
        title: 'Contact',
      },
      {
        Component: ProjectsSection,
        href: 'free-code-camp-projects',
        title: 'Free Code Camp Projects',
        projects,
      },
    ],
  }))
)(App)
