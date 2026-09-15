import { formatISODate } from "./FormatUtil";

/**
 * 평가(리뷰) 작성이 가능한 메뉴인지 판별합니다.
 * 오늘 제공되는 메뉴에만 평가를 남길 수 있습니다.
 *
 * 메뉴 상세 페이지·사진 리뷰 페이지의 평가 버튼 노출 조건과
 * 평가 작성 페이지의 접근 제한이 모두 이 함수를 사용합니다.
 */
const isReviewableMenu = (menu: { date: string }): boolean => {
  return formatISODate(new Date()) === menu.date;
};

export default isReviewableMenu;
