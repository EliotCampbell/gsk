'use client'
import React, { FC, useEffect } from 'react'
import { ObjectType } from '@/modules/userPanel/types'
import Spinner from '@/modules/UI/Spinner/Spinner'

const MyObjects: FC<{
  objects: ObjectType
  dataUploadFunction: () => void
  pending: boolean
}> = ({ objects, dataUploadFunction, pending }) => {
  useEffect(() => {
    dataUploadFunction()
  }, [])

  pending && new Promise(() => {})

  return pending ? <Spinner /> : <p>MY OBJECTS</p>
}

export default MyObjects
