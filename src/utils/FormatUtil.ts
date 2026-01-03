export function formatDate(date) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${formatISODate(date)} (${week[date.getDay()]})`;
}

export function formatReviewDate(dateString) {
  // format from "2021-08-01" to "2021년 08월 01일"
  const [year, month, day] = dateString.split("-");
  return `${year}년 ${month}월 ${day}일`;
}

export function formatWeekday(date) {
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return week[date.getDay()];
}

export function formatMonthForMobile(date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function formatMonth(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function formatISODate(date: Date) {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
}

export function formatPostCommentDate(dateString) {
  let date: Date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day} ${hours}:${minutes}`;
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
  if (price.toString().length <= 3) return price;
  return price.toString().slice(0, price.toString().length - 3) + "," + price.toString().slice(-3);
}

export function sanitizeCssSelector(str) {
  return str.trim().replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9-_:.]/g, "_");
}

/**
 * 주어진 문자열에 받침이 있는지 확인하는 함수
 * @param str 받침을 확인할 문자열
 * @param particles 받침이 있을 때, 붙일 조사 (기본값: 은/는)
 * @returns 받침이 있으면 particles[0], 없으면 particles[1]
 */
export function getParticle(str, particles: [string, string] = ["은", "는"]) {
  if (!str) return particles[1]; // 빈 문자열 처리 (기본값: 받침 없음)

  const lastChar = str.charAt(str.length - 1);
  const code = lastChar.charCodeAt(0);

  // 한글 여부 판별 (가~힣)
  if (code >= 0xac00 && code <= 0xd7a3) {
    return (code - 0xac00) % 28 === 0 ? particles[1] : particles[0];
  }

  return particles[1];
}
