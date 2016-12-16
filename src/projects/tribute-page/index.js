import React from 'react'

import {
  Col,
  Row,
  Grid,
  PageHeader,
  Image,
  Jumbotron,
} from 'react-bootstrap'

const data = [
  {
    year: 1914,
    msg: 'Born in Cresco, Iowa',
  }, {
    year: 1933,
    msg: 'Leaves his family\'s farm to attend the University of Minnesota, thanks to a Depression era program known as the "National Youth Administration"',
  }, {
    year: 1935,
    msg: 'Has to stop school and save up more money. Works in the Civilian Conservation Corps, helping starving Americans. "I saw how food changed them", he said. "All of this left scars on me."',
  }, {
    year: 1937,
    msg: 'Finishes university and takes a job in the US Forestry Service',
  }, {
    year: 1938,
    msg: 'Marries wife of 69 years Margret Gibson. Gets laid off due to budget cuts. Inspired by Elvin Charles Stakman, he returns to school study under Stakman, who teaches him about breeding pest-resistent plants.',
  }, {
    year: 1941,
    msg: 'Tries to enroll in the military after the Pearl Harbor attack, but is rejected. Instead, the military asked his lab to work on waterproof glue, DDT to control malaria, disenfectants, and other applied science.',
  }, {
    year: 1942,
    msg: 'Receives a Ph.D. in Genetics and Plant Pathology',
  }, {
    year: 1944,
    msg: 'Rejects a 100% salary increase from Dupont, leaves behind his pregnant wife, and flies to Mexico to head a new plant pathology program. Over the next 16 years, his team breeds 6,000 different strains of disease resistent wheat - including different varieties for each major climate on Earth.',
  }, {
    year: 1945,
    msg: 'Discovers a way to grown wheat twice each season, doubling wheat yields',
  }, {
    year: 1953,
    msg: 'crosses a short, sturdy dwarf breed of wheat with a high-yeidling American breed, creating a strain that responds well to fertalizer. It goes on to provide 95% of Mexico\'s wheat.',
  }, {
    year: 1962,
    msg: 'Visits Delhi and brings his high-yielding strains of wheat to the Indian subcontinent in time to help mitigate mass starvation due to a rapidly expanding population',
  }, {
    year: 1970,
    msg: 'receives the Nobel Peace Prize',
  }, {
    year: 1983,
    msg: 'helps seven African countries dramatically increase their maize and sorghum yields',
  }, {
    year: 1984,
    msg: 'becomes a distinguished professor at Texas A&M University',
  }, {
    year: 2005,
    msg: 'states "we will have to double the world food supply by 2050." Argues that genetically modified crops are the only way we can meet the demand, as we run out of arable land. Says that GM crops are not inherently dangerous because "we\'ve been genetically modifying plants and animals for a long time. Long before we called it science, people were selecting the best breeds."',
  }, {
    year: 2009,
    msg: 'dies at the age of 95.',
  },
]

const ListRow = ({ year, msg }) => (
  <li>
    <strong>{ year }</strong> - { msg }
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
  quoteCitation,
  moreInfo,
}) => (
  <Col md={10} mdOffset={1}>
    <h3>{ title }</h3>
    <ListComponent listData={listData} />
    <blockquote>
      <p>{ quote }</p>
      <cite>{ quoteCitation }</cite>
    </blockquote>
    <h3>{ moreInfo }</h3>
  </Col>
)

const TributePage = () => (
  <Grid>
    <Jumbotron>
      <Row>
        <Col md={12}>
          <SiteHeaderComponent
            title="Dr. Norman Borlaug"
            subtitle="The man who saved a billion lives"
          />
          <ImageComponent
            imgUrl="https://c2.staticflickr.com/4/3689/10613180113_fdf7bcd316_b.jpg"
            caption="Dr. Norman Borlaug, second from left, trains biologists in
            Mexico on how to increase wheat yields - part of his life-long war
            on hunger."
          />
          <BodyComponent
            title="Here's a time line of Dr. Borlaug's life:"
            listData={ data }
            quote={`"Borlaug's life and achievement are testimony to the
            far-reaching contribution that one man's towering intellect,
            persistence and scientific vision can make to human peace and
            progress."`}
            quoteCitation="&mdash; Indian Prime Minister Manmohan Singh"
            moreInfo={(
              <div>
                If you have time, you should read more about this incredible human being on his{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Norman_Borlaug"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia entry
                </a>
                .
              </div>
            )}
          />
        </Col>
      </Row>
    </Jumbotron>
  </Grid>
)

export default TributePage
