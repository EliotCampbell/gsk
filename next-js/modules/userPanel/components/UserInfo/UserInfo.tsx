'use client'
import React from 'react'
import classes from './UserInfo.module.css'
import { UserInfoType } from '@/modules/userPanel/types'
import Image from 'next/image'
import Spinner from '@/modules/UI/Spinner/Spinner'

const UserInfo: React.FC<{ userInfo: UserInfoType; pending: boolean }> = ({
  userInfo,
  pending
}) => {
  return (
    <div className={classes.UserInfo}>
      {pending ? (
        <Spinner />
      ) : (
        <div className={classes.profileInfo}>
          {userInfo.img ? (
            <Image
              src={userInfo.img}
              alt={'User profile photo'}
              className={classes.img}
            />
          ) : (
            <div className={classes.img}>
              <h1>{userInfo.name[0] || userInfo.username[0]}</h1>
            </div>
          )}
          <div className={classes.infoContainer}>
            <p className={classes.greeting}>{`Привет, ${
              userInfo.name || userInfo.id
            }!`}</p>

            <div className={classes.singleInfo}>
              <p
                className={classes.singleInfoTitle}
              >{`Идентификатор пользователя: `}</p>
              <p className={classes.singleInfoBody}>{userInfo.id}</p>
            </div>

            <div className={classes.singleInfo}>
              <p className={classes.singleInfoTitle}>{`Пользователь: `}</p>
              <p className={classes.singleInfoBody}>{userInfo.username}</p>
            </div>

            <div className={classes.singleInfo}>
              <p className={classes.singleInfoTitle}>{`Имя: `}</p>
              <p
                className={classes.singleInfoBody}
              >{`${userInfo.name} ${userInfo.surname}`}</p>
            </div>

            <div className={classes.singleInfo}>
              <p className={classes.singleInfoTitle}>{`Email: `}</p>
              <p className={classes.singleInfoBody}>{userInfo.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
