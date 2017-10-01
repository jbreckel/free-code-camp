import React from 'react'

import { Image } from 'react-bootstrap'

const ImageComponent = ({ imgUrl, caption }) => (
  <div className="thumbnail">
    <Image src={imgUrl} responsive />
    <div className="caption text-center">{caption}</div>
  </div>
)

export default ImageComponent
