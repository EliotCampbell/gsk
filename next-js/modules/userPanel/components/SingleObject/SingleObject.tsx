'use client'

import React, { FC } from 'react'
import classes from './SingleObject.module.css'
import { LuParkingSquare } from 'react-icons/lu'
import { MdOutlineGarage } from 'react-icons/md'
import Link from 'next/link'
import { ObjectType } from '@/modules/userPanel/types'

const SingleObject: FC<{ object: ObjectType }> = ({ object }) => {
  return (
    <Link href={'/'} className={classes.SingleObject}>
      {object.type === 'garage' && (
        <>
          <MdOutlineGarage className={classes.ico} />
          <p>{`Гараж №${object.individual_number}`}</p>
        </>
      )}
      {object.type === 'parking_space' && (
        <>
          <LuParkingSquare className={classes.ico} />
          <p>{`Парковочное место №${object.individual_number}`}</p>
        </>
      )}
    </Link>
  )
}

export default SingleObject
