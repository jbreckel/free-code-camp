import React from 'react'

import { Section } from '../components'

const ContactSection = () => (
  <Section id="contact" title="Contact">
    If you want to contact me, please feel free to send me a carrier pigeon.
    <br />
    If you don&apos;t have your pigeon at hand, you can find me at{' '}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.linkedin.com/in/jbreckel"
    >
      <i className="fa fa-linkedin-square fa-2x" style={{ color: '#444' }} />
    </a>{' '}
    and{' '}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/jbreckel"
    >
      <i className="fa fa-github-square fa-2x" style={{ color: '#444' }} />
    </a>.
  </Section>
)

export default ContactSection
