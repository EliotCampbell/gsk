'use client'
import React, { FC } from 'react'
import { ObjectType } from '@/modules/userPanel/types'
import SingleObject from '@/modules/userPersonalDetails/components/SingleObject/SingleObject'
import classes from './UserObjectsPanel.module.css'
import { STATUS } from '@/types/statusTypes'
import { usePromise } from '@/hooks/usePromise'

const UserObjectsPanel: FC<{
  objects: ObjectType[]
  status: STATUS
  getData: () => {}
}> = ({ objects, status, getData }) => {
  usePromise(getData, status === STATUS.pending)

  return objects.length > 0 ? (
    <div className={classes.UserObjectsPanel}>
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
