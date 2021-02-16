export function formatDate(date: Date) {
  const week: string[] = ['일', '월', '화', '수', '목', '금', '토']
  return `${("0" + (date.getMonth() + 1)).slice(-2)}. ${("0" + date.getDate()).slice(-2)}. ${week[date.getDay()]}`
}

export function formatISODate(date: Date) {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}