'use client'
import React from 'react'
import classes from './UserInfo.module.css'
import { UserInfoType } from '@/modules/userPersonalDetails/types'
import Image from 'next/image'
import Spinner from '@/modules/UI/Spinner/Spinner'

const UserInfo: React.FC<{ userInfo: UserInfoType; pending: boolean }> = ({
  userInfo: { userPublicInfo, userPrivateInfo },
  pending
}) => {
  return (
    <div className={classes.UserInfo}>
      {pending ? (
        <Spinner />
      ) : (
        <div className={classes.profileInfo}>
          {userPublicInfo.data.img ? (
            <Image
              src={userPublicInfo.data.img}
              alt={'User profile photo'}
              className={classes.img}
            />
          ) : (
            <div className={classes.img}>
              <h1>
                {userPublicInfo.data.name[0] || userPublicInfo.data.username[0]}
              </h1>
            </div>
          )}
          <div className={classes.infoContainer}>
            <p className={classes.greeting}>{`Привет, ${
              userPublicInfo.data.name || userPublicInfo.data.name
            }!`}</p>

            <div className={classes.singleInfo}>
              <p
                className={classes.singleInfoTitle}
              >{`Идентификатор пользователя: `}</p>
              <p className={classes.singleInfoBody}>
                {userPrivateInfo.data.id}
              </p>
            </div>

            <div className={classes.singleInfo}>
              <p className={classes.singleInfoTitle}>{`Пользователь: `}</p>
              <p className={classes.singleInfoBody}>
                {userPublicInfo.data.username}
              </p>
            </div>

            <div className={classes.singleInfo}>
              <p className={classes.singleInfoTitle}>{`Имя: `}</p>
              <p
                className={classes.singleInfoBody}
              >{`${userPublicInfo.data.name} ${userPublicInfo.data.surname}`}</p>
            </div>

            <div className={classes.singleInfo}>
              <p className={classes.singleInfoTitle}>{`Email: `}</p>
              <p className={classes.singleInfoBody}>
                {userPrivateInfo.data.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
