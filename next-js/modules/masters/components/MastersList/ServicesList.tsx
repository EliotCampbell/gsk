import React, { FC } from 'react'
import SingleService from '@/modules/masters/components/SingleService/SingleService'
import classes from './ServicesList.module.css'
import { SingleServiceType } from '@/types/services/servicesTypes'
const ServicesList: FC<{ services: SingleServiceType[] }> = ({ services }) => {
  return (
    <div className={classes.servicesList}>
      <h1 className={classes.title}>
        {'МАСТЕРА '}
        <span className={classes.countOfMasters}>{services.length}</span>
      </h1>
      {services.length > 0 ? (
        services.map((service) => (
          <SingleService singleService={service} key={service.id} />
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default ServicesList
