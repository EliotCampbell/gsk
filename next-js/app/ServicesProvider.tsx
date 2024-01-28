'use client'
import { ReactNode, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/lib/redux/store'

const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  useEffect(() => {}, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default ServicesProvider
