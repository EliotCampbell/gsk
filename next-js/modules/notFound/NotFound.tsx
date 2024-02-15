'use client'
import React from 'react'
import classes from './NotFound.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NotFound: React.FC = () => {
  const router = useRouter()
  return (
    <div className={classes.wrapper}>
      <p className={classes.notFound}>404</p>
      <p className={classes.logo}>ГСК</p>
      <p className={classes.info}>
        Неправильно набран адрес или такой страницы не существует :_(
      </p>
      <p className={classes.info}>
        {'Перейти на '}
        <Link className={classes.action} href={'/'}>
          главную
        </Link>
      </p>
      {window.history.length > 2 && (
        <p className={classes.info}>
          {'Вернуться '}
          <button
            className={classes.action}
            onClick={(event) => {
              event.preventDefault()
              router.back()
            }}
          >
            {'назад'}
          </button>
        </p>
      )}
    </div>
  )
}

export default NotFound
