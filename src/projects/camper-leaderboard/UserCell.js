import React from 'react'
import {
  Image,
} from 'react-bootstrap'

const UserCell = ({ username, img }) => (
  <div>
    <Image thumbnail src={img} style={{ maxHeight: `${60}px`, maxWidth: `${60}px` }} /> {' '}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.freecodecamp.com/${username}`}
    >
      { username }
    </a>
  </div>
)

export default UserCell
