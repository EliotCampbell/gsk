'use client'
import React from 'react'
import classes from './UserInfo.module.css'

export type TUserInfo = {
  username: string
  name: string
}

const UserInfo: React.FC<{ userInfo: TUserInfo }> = ({ userInfo }) => {
  //todo: types
  return (
    <h1 className={classes.title}>Привет, {userInfo.userPrivateData.id}</h1>
  )
}

export default UserInfo
