export function formatDate(date) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${formatISODate(date)} (${week[date.getDay()]})`;
}

export function formatWeekday(date) {
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return week[date.getDay()];
}

export function formatMonth(date) {
  return `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}`;
}

export function formatISODate(date) {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
}

export function getYesterday(date) {
  const yesterday = new Date(date);
  yesterday.setDate(date.getDate() - 1);
  return yesterday;
}

export function getTomorrow(date) {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow;
}

export function getNextMonth(date) {
  const next = new Date(date);
  next.setMonth(date.getMonth() + 1);
  return next;
}

export function getPrevMonth(date) {
  const prev = new Date(date);
  prev.setMonth(date.getMonth() - 1);
  return prev;
}

export function formatPrice(price) {
  return (
    price.toString().slice(0, price.toString().length - 3) +
    "," +
    price.toString().slice(-3)
  );
}
