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

export function getYesterday(date) {
  const yesterday = new Date(date)
  yesterday.setDate(date.getDate() - 1)
  return yesterday
}

export function getTomorrow(date) {
  const tomorrow = new Date(date)
  tomorrow.setDate(date.getDate() + 1)
  return tomorrow
}

export function formatPrice(price) {

  return price.toString().slice(0, price.toString().length-3) + "," + price.toString().slice(-3)
}
