'use client'
import React, { FC } from 'react'
import SingleObject from '@/modules/userPanel/components/SingleObject/SingleObject'
import classes from './UserObjectsPanel.module.css'
import { ObjectType } from '@/modules/userPanel/types'
import Spinner from '@/modules/UI/Spinner/Spinner'
import { useLayoutInit } from '@/hooks/useLayoutInit'

const UserObjectsPanel: FC<{
  objects: ObjectType[]
  pending: boolean
  getData: () => {}
}> = ({ objects, pending, getData }) => {
  useLayoutInit(getData)

  return pending ? (
    <Spinner />
  ) : objects.length > 0 ? (
    <div className={classes.UserObjectsContainer}>
      {objects.map((object) => (
        <SingleObject key={object.id} object={object} />
      ))}
    </div>
  ) : (
    <div className={classes.fallbackContainer}>
      <p className={classes.fallbackText}> {'Объекты не найдены'}</p>
    </div>
  )
}

export default UserObjectsPanel
