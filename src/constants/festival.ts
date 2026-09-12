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

/**
 * 축제 식당별 외부 링크 (인스타그램 등).
 * 식당 카드 제목을 클릭하면 해당 링크로 이동합니다.
 * key는 서버가 내려주는 `name_kr` 값과 정확히 일치해야 합니다.
 */
export const FESTIVAL_RESTAURANT_LINKS: Record<string, string> = {
  "[축제] 실리꼬치밸리": "https://www.instagram.com/kyb_official.21/",
};

/**
 * 식당 이름에 연결된 외부 링크를 반환합니다. 없으면 undefined.
 * @param {string} nameKr - 식당 이름 (name_kr)
 */
export const getFestivalRestaurantLink = (nameKr: string): string | undefined =>
  FESTIVAL_RESTAURANT_LINKS[nameKr];

/**
 * 식단 목록 최상단에 고정할 축제 식당 이름 목록 (임시 로직).
 * 로그인 여부와 사용자가 지정한 식당 순서에 관계없이 항상 맨 위에 노출됩니다.
 * 축제 종료 후 제거해야 합니다.
 */
export const PINNED_FESTIVAL_RESTAURANT_NAMES = ["[축제] 실리꼬치밸리"];

/**
 * 식당 목록에서 고정 대상 축제 식당을 맨 앞으로 옮깁니다.
 * 나머지 식당들의 상대 순서는 그대로 유지됩니다.
 * @param {T[]} restaurants - 정렬할 식당 목록
 */
export const pinFestivalRestaurants = <T extends { name_kr: string }>(restaurants: T[]): T[] => {
  const isPinned = (restaurant: T) => PINNED_FESTIVAL_RESTAURANT_NAMES.includes(restaurant.name_kr);

  if (!restaurants.some(isPinned)) return restaurants;

  return [...restaurants.filter(isPinned), ...restaurants.filter((r) => !isPinned(r))];
};
