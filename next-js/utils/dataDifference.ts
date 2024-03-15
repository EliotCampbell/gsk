export const findDifference = (created_at: Date) => {
  const now = new Date()
  const diff = now.getTime() - created_at.getTime()

  // Переводим разницу в миллисекундах в секунды
  const seconds = Math.floor(diff / 1000)

  const createPlural = (locale: string, forms: Record<string, string>) => {
    return (count: number) => {
      const key = new Intl.PluralRules(locale).select(count)
      return forms[key] || ''
    }
  }

  const pluralSeconds = createPlural('RU-ru', {
    one: 'секунда',
    few: 'секунды',
    many: 'секунд'
  })

  const pluralMinutes = createPlural('RU-ru', {
    one: 'минута',
    few: 'минуты',
    many: 'минут'
  })

  const pluralHours = createPlural('RU-ru', {
    one: 'час',
    few: 'часа',
    many: 'часов'
  })

  const pluralDays = createPlural('RU-ru', {
    one: 'день',
    few: 'дня',
    many: 'дней'
  })

  if (seconds < 60) {
    return seconds + ' ' + pluralSeconds(seconds) + ' ' + ' назад'
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return minutes + ' ' + pluralMinutes(minutes) + '  назад'
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return hours + ' ' + pluralHours(hours) + ' ' + ' назад'
  } else {
    const days = Math.floor(seconds / 86400)
    return days + ' ' + pluralDays(days) + ' ' + 'назад'
  }
}
