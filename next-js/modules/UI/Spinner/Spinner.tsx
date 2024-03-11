import React from 'react'
import classes from './Spinner.module.css'
import { FiRotateCw } from 'react-icons/fi'

const Spinner: React.FC<{ rotate?: boolean; color?: 'colored' | 'white' }> = ({
  rotate = true,
  color = 'colored'
}) => {
  const styles = `${classes.spinner} ${
    color === 'colored' && classes.spinner_colored
  } ${color === 'white' && classes.spinner_white} ${
    rotate && classes.spinner_pending
  }
      `

  return (
    <div className={classes.spinnerContainer}>
      <FiRotateCw className={styles} />
    </div>
  )
}

export default Spinner
