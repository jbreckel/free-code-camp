import React from 'react'

import {
  Col,
  Row,
  Grid,
  Jumbotron,
} from 'react-bootstrap'

import {
  compose,
  mapProps,
} from 'recompose'

import { Disclaimer } from '../../components'

import data from './data'

import BodyComponent from './Body'
import SiteHeaderComponent from './Header'
import ImageComponent from './Image'

const TributePage = ({
  siteTitle, subtitle, imgUrl, imgCaption, bodyTitle, bulletPoints, quote, quoteAuthor, moreInfo,
}) => (
  <Grid>
    <Jumbotron>
      <Row>
        <Col md={12}>
          <SiteHeaderComponent
            title={ siteTitle }
            subtitle={ subtitle }
          />
          <ImageComponent
            imgUrl={ imgUrl }
            caption={ imgCaption }
          />
          <BodyComponent
            title={ bodyTitle }
            listData={ data }
            quote={ quote }
            quoteAuthor={ quoteAuthor }
            moreInfo={ moreInfo }
          />
        </Col>
      </Row>
      <Disclaimer
        project="tribute-page"
      />
    </Jumbotron>
  </Grid>
)

export default compose(
  mapProps((props) => ({
    ...props,
    siteTitle: 'Dr. Norman Borlaug',
    subtitle: 'The man who saved a billion lives',
    imgUrl: 'https://c2.staticflickr.com/4/3689/10613180113_fdf7bcd316_b.jpg',
    imgCaption: 'Dr. Norman Borlaug, second from left, trains biologists in Mexico on how to increase wheat yields - part of his life-long war on hunger.',
    bodyTitle: "Here's a time line of Dr. Borlaug's life:",
    bulletPoints: data,
    quote: '"Borlaug\'s life and achievement are testimony to the far-reaching contribution that one man\'s towering intellect, persistence and scientific vision can make to human peace and progress."',
    quoteAuthor: 'Indian Prime Minister Manmohan Singh',
    moreInfo: (
      <div>
        If you have time, you should read more about this incredible human being on his{' '}
        <a
          href="https://en.wikipedia.org/wiki/Norman_Borlaug"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia entry
        </a>.
      </div>
    ),
  })),
)(TributePage)
