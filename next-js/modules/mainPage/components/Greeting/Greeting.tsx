import React, { FC } from 'react'
import classes from './Greeting.module.css'

const Greeting: FC = () => {
  return (
    <div className={classes.greeting}>
      <h1>Добро пожаловать на сайт кооператива "ГСК"!</h1>
    </div>
  )
}

export default Greeting
