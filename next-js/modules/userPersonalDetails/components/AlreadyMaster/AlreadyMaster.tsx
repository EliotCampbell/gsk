import React, { FC } from 'react'
import { ServiceType } from '@/modules/userPersonalDetails/types'
import classes from './AlreadyMaser.module.css'
import { FiTrash } from 'react-icons/fi'

const AlreadyMaster: FC<{
  services: ServiceType[]
  deleteServiceHandler: (id: string) => {}
}> = ({ services, deleteServiceHandler }) => {
  return (
    <div className={classes.alreadyMaster}>
      {services.map((service) => (
        <div key={service.id}>
          {service.title}
          <button onClick={() => deleteServiceHandler(service.id)}>
            <FiTrash />
          </button>
        </div>
      ))}
    </div>
  )
}

export default AlreadyMaster
