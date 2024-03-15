import { SingleServiceType } from '@/types/services/servicesTypes'
import React, { FC } from 'react'
import { getServices } from '@/serverServices/supabase/server/services'
import ServicesList from '@/modules/masters/components/MastersList/ServicesList'

const Services: FC = async () => {
  const data = await getServices()
  const services: SingleServiceType[] = data.flatMap((service) => {
    if (service.users_profiles) {
      return [
        {
          ...service,
          created_at: new Date(service.created_at),
          author: service.users_profiles
        }
      ]
    }
    return []
  })

  return <ServicesList services={services} />
}

export default Services
