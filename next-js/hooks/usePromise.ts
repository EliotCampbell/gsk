import { useEffect } from 'react'

export const usePromise = (fn: () => void, loadingState: boolean) => {
  useEffect(() => {
    fn()
  }, [])
  if (loadingState) throw new Promise(() => {})
}
