import React from 'react'

import { Link } from 'react-router'

import Section from './Section'

const ContactSection = () => (
  <Section id="contact" title="Contact">
    If you want to contact me, please feel free to send me a carrier pigeon.
    <br />
    If you don&apos;t have your pigeon at hand, you can find me at{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      to="https://www.linkedin.com/in/jbreckel"
    >
      <i className="fa fa-linkedin-square fa-2x" style={{ color: '#444' }} />
    </Link> and{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      to="https://github.com/jbreckel"
    >
      <i className="fa fa-github-square fa-2x" style={{ color: '#444' }} />
    </Link>.
  </Section>
)

export default ContactSection
