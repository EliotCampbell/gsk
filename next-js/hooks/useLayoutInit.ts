import { useLayoutEffect } from 'react'

export const useLayoutInit = (initFunction: () => void) => {
  useLayoutEffect(() => {
    initFunction()
  }, [])
}
