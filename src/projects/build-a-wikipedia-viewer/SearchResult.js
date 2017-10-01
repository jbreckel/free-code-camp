import React from 'react'

import { Image } from 'react-bootstrap'

const SearchResult = ({
  setHover,
  hover,
  page: {
    pageid,
    ns,
    title,
    index,
    extract,
    thumbnail: { source, width, height } = {},
  },
}) => (
  <a
    style={{
      width: '75%',
      marginBottom: 15,
      display: 'flex',
      color: 'black',
      textDecoration: 'none',
    }}
    href={`https://en.wikipedia.org/?curid=${pageid}`}
    target="_blank"
    rel="noreferrer noopener"
    onMouseEnter={() => setHover(pageid)}
    onMouseLeave={() => setHover(null)}
  >
    <div
      style={{
        flexShrink: 0,
        width: 7,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: hover === pageid && 'orange',
      }}
    />
    {/* Hover bar */}
    <div
      style={{
        padding: 5,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 4,
        ...(hover === pageid
          ? {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }
          : {
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }),
      }}
    >
      {/* Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <h4 style={{ display: 'inline', fontWeight: 'bold' }}>{title}</h4>
        {source && (
          <Image thumbnail src={source} width={width} height={height} />
        )}
      </div>
      <p>{extract}</p>
    </div>
  </a>
)

export default SearchResult

// "pageid": 140710,
// "ns": 0,
// "title": "Electrical reactance",
// "index": 9,
// "extract
