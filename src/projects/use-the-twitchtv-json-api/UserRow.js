import React from 'react'

import { Image } from 'react-bootstrap'

const UserRow = ({
  defaultLogo = Math.floor(Math.random() * 255).toString(16),
  user: { display_name: displayName, name, logo },
  stream: { stream },
}) => (
  <a
    href={name && `https://www.twitch.tv/${name}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      textDecoration: 'none',
      color: 'white',
    }}
  >
    <div
      style={{
        margin: 10,
        padding: 10,
        border: '1px solid white',
        borderRadius: 4,
        display: 'flex',
      }}
    >
      <Image
        circle
        height={45}
        src={
          logo ||
          `https://dummyimage.com/50/ff/${defaultLogo}.png?text=0x${defaultLogo}`
        }
      />
      <div
        style={{
          marginLeft: 15,
          display: 'inline-block',
        }}
      >
        <h5>{displayName}</h5>
        <p>
          {stream
            ? stream.channel.status
            : (!name && 'This user does not exist.') || 'Offline'}
        </p>
      </div>
    </div>
  </a>
)

export default UserRow
