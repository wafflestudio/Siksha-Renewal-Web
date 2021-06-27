export function formatDate(date) {
  const week = ['일', '월', '화', '수', '목', '금', '토']
  return `${formatISODate(date)} (${week[date.getDay()]})`
}

export function formatISODate(date) {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

export function formatWeek(date) {
  return date.getDay() === 0 ? 'holiday' : date.getDay() === 6 ? 'saturday' : 'weekdays'
}
