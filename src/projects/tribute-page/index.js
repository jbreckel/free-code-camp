import React from 'react'

import {
  Col,
  Row,
  Grid,
  PageHeader,
  Image,
  Jumbotron,
} from 'react-bootstrap'

import {
  compose,
  mapProps,
} from 'recompose'

import { Blockquote } from '../../components'

import data from './data'

const ListRow = ({ year, msg }) => (
  <li>
    <strong>{ year }</strong> &mdash; { msg }
  </li>
)

const ListComponent = ({ listData }) => (
  <ul>
    {
      listData.map((item) => (
        <ListRow key={item.year + item.msg} {...item} />
      ))
    }
  </ul>
)

const ImageComponent = ({ imgUrl, caption }) => (
  <div className="thumbnail">
    <Image src={ imgUrl } responsive />
    <div className="caption text-center">
      { caption }
    </div>
  </div>
)

const SiteHeaderComponent = ({ title, subtitle }) => (
  <PageHeader className="text-center">
    { title }
    <br />
    <small><em>{ subtitle }</em></small>
  </PageHeader>
)

const BodyComponent = ({
  title,
  listData,
  quote,
  quoteAuthor,
  moreInfo,
}) => (
  <Col md={10} mdOffset={1}>
    <h3>{ title }</h3>
    <ListComponent listData={listData} />
    <Blockquote
      style={{
        hyphens: 'auto',
      }}
      author={ quoteAuthor }
    >
      { quote }
    </Blockquote>
    <h3>{ moreInfo }</h3>
  </Col>
)

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
