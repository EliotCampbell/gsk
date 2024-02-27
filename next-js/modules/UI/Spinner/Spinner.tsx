import React from 'react'
import classes from './Spinner.module.css'
import { FiRotateCw } from 'react-icons/fi'

const Spinner: React.FC<{ rotate?: boolean }> = ({ rotate = true }) => {
  return (
    <div className={classes.spinnerContainer}>
      <FiRotateCw
        className={
          rotate
            ? `${classes.spinner} ${classes.spinner_pending}`
            : classes.spinner
        }
      />
    </div>
  )
}

export default Spinner
