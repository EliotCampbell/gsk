import { useEffect, useState } from 'react'

export const usePromise = (valueToResolve: boolean) => {
  const [isResolved, setIsResolved] = useState(false)

  useEffect(() => {
    if (valueToResolve) {
      setIsResolved(true)
    }
  }, [valueToResolve])

  return new Promise((resolve) => {
    if (isResolved) {
      resolve(null)
    }
  })
}
