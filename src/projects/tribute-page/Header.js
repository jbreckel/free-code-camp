import React from 'react'

import { PageHeader } from 'react-bootstrap'

const SiteHeaderComponent = ({ title, subtitle }) => (
  <PageHeader className="text-center">
    {title}
    <br />
    <small>
      <em>{subtitle}</em>
    </small>
  </PageHeader>
)

export default SiteHeaderComponent
