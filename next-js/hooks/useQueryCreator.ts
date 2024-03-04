import { usePathname } from 'next/navigation'

export const useQueryCreator = (key: string) => {
  return (value: string) => {
    const pathname = usePathname()
    const query = new URLSearchParams()
    query.set(key, value)
    return `${pathname}?${query}`
  }
}
