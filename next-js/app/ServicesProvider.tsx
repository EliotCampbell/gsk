'use client'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/clientServices/redux/store'

const ServicesProvider = ({ children }: { children?: ReactNode }) => {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default ServicesProvider
