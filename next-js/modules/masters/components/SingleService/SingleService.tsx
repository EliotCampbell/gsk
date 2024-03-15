import React, { FC } from 'react'
import classes from './SingleSrvice.module.css'
import { SingleServiceType } from '@/types/services/servicesTypes'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import { findDifference } from '@/utils/dataDifference'
import Image from 'next/image'

const SingleService: FC<{
  singleService: SingleServiceType
}> = ({ singleService }) => {
  return (
    <div className={classes.singleService}>
      <div className={classes.servicePicture}>
        {singleService.service_images.length > 0 ? (
          <Image
            className={classes.image}
            src={singleService.service_images[0]}
            alt={'img'}
            fill
          ></Image>
        ) : (
          <div className={classes.imagePlaceholder}></div>
        )}
      </div>
      <div className={classes.serviceBody}>
        <p className={classes.title}>{singleService.title}</p>
        <p className={classes.body}>{singleService.body}</p>
        <p
          className={classes.timestamp}
          title={new Intl.DateTimeFormat('ru-RU', {
            dateStyle: 'short',
            timeStyle: 'medium'
          }).format(singleService.created_at)}
        >
          {findDifference(singleService.created_at)}
        </p>
      </div>
      <div className={classes.serviceContact}>
        <p className={classes.authorName}>
          {singleService.author.name + ' ' + singleService.author.surname ||
            singleService.author.username}
        </p>
        <p className={classes.phone}>
          {singleService.phone_country_code +
            singleService.phone.replace(
              /^(\d{3})(\d{3})(\d{2})(\d{2})$/,
              ' ($1) $2-$3-$4'
            )}
        </p>
        {singleService.whatsapp && (
          <Link
            className={classes.whatsApp}
            href={
              'https://wa.me/' +
              singleService.phone_country_code +
              singleService.phone
            }
          >
            <FaWhatsapp />
          </Link>
        )}
        {singleService.telegram && (
          <Link
            className={classes.telegram}
            href={'https://t.me/' + singleService.telegram}
          >
            <FaTelegramPlane />
          </Link>
        )}
        {singleService.custom_contact && (
          <p className={classes.customContact}>
            {singleService.custom_contact}
          </p>
        )}
      </div>
    </div>
  )
}

export default SingleService
