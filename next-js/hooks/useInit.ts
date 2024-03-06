import { useEffect } from 'react'

export const useInit = (initFunction: () => void) => {
  useEffect(() => {
    initFunction()
  }, [])
}
