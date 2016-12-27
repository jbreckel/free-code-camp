import React from 'react'
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'

import { compose, mapProps, withState } from 'recompose'

import marked from 'marked'

const Root = ({ rawText, markdown, setText, disabled }) => (
  <Grid
    fluid
  >
    <Row style={{ height: '100%' }}>
      <Col md={6}>
        <textarea
          disabled={ disabled }
          rows="22"
          style={{
            overflow: disabled && 'hidden',
            width: '100%',
            height: '100%',
            resize: 'vertical',
          }}
          value={rawText}
          onChange={({ target }) => setText(target.value)}
        />
      </Col>
      <Col md={6}>
        <span dangerouslySetInnerHTML={ markdown } />
      </Col>
    </Row>
  </Grid>
)

const initialText = `Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

\`\`\`
console.log('Hello');
\`\`\`

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Julius Breckel](https://freecodecamp.com/jbreckel)*
`

const MarkdownPreviewer = compose(
  withState('rawText', 'setText', initialText ),
  mapProps(({ rawText, ...rest }) => ({
    ...rest,
    rawText,
    markdown: { __html: marked(rawText) },
  })),
)(Root)

export default MarkdownPreviewer
