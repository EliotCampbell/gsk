import React, { FC } from 'react'
import classes from './ImagePlaceholder.module.css'

const ImagePlaceholder: FC<{ str: string }> = ({ str }) => {
  return (
    <div className={classes.imagePlaceholder}>
      <p className={classes.letter}>{str[0] || ''}</p>
    </div>
  )
}

export default ImagePlaceholder
