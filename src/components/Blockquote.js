import React from 'react'

const Blockquote = ({ children, style: { color, ...style }, author }) => (
  <blockquote
    style={{
      margin: '1.5em 10px',
      padding: '1em 10px',
      borderLeft: `5px solid ${color}`,
      fontWeight: 400,
      color,
      ...style,
      quotes: '"&#8220;" "&#8221;" "&#8216;" "&#8217;"',
    }}
  >
    <span
      style={{
        color,
        fontSize: '4em',
        lineHeight: '0.1em',
        marginRight: '0.25em',
        verticalAlign: '-0.4em',
      }}
    >
      &#8220;
    </span>
    {children}
    {author && (
      <small
        style={{
          color,
        }}
      >
        {author}
      </small>
    )}
  </blockquote>
)

export default Blockquote
