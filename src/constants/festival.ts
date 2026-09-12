/**
 * 하드코딩된 축제 기간 (2026 가을축제).
 *
 * 서버의 `/menus/festival/{date}` 응답을 우선 사용하되,
 * 서버에 축제 기간이 아직 등록되지 않았거나 API 호출이 실패한 경우를 대비한 값입니다.
 * 축제 종료 후에는 이 상수와 관련 로직을 제거해야 합니다.
 */
export const FESTIVAL_START_DATE = "2026-09-15";
export const FESTIVAL_END_DATE = "2026-09-17";

/**
 * 주어진 날짜가 하드코딩된 축제 기간에 속하는지 반환합니다.
 * @param {string} dateString - ISO 형식 날짜 문자열 (YYYY-MM-DD)
 */
export const isHardcodedFestivalDate = (dateString: string) =>
  dateString >= FESTIVAL_START_DATE && dateString <= FESTIVAL_END_DATE;
