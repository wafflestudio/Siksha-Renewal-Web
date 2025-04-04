import styled, { css } from "styled-components";
import { ReviewListType } from "app/menu/[menuId]/Menu";
import ReviewItem from "./ReviewItem";
import useIsMobile from "hooks/UseIsMobile";
import Image from "next/image";
import MobileLayout from "styles/layouts/MobileLayout";
import MobileReviewListPage from "./MobileReviewListPage";

export interface MenuType {
  id: number;
  restaurant_id: number;
  code: string;
  date: string;
  type: string;
  name_kr: string;
  name_en: string;
  price: number;
  etc: {};
  created_at: string;
  updated_at: string;
  score: number | null;
  review_cnt: number;
  is_liked: boolean;
  like_cnt: number;
}

interface ReviewSectionProps {
  reviews: ReviewListType;
  isReviewListPageOpen: boolean;
  handleReviewListPage: (isOpen: boolean) => void;
}
export default function ReviewSection({
  reviews,
  isReviewListPageOpen,
  handleReviewListPage,
}: ReviewSectionProps) {
  const isMobile = useIsMobile();
  const PREVIEW_REVIEWS_COUNT = 5;
  let previewReviews = reviews.result;
  if (reviews.result.length > PREVIEW_REVIEWS_COUNT) {
    previewReviews = reviews.result.slice(0, PREVIEW_REVIEWS_COUNT);
  }

  return (
    <>
      {isMobile && isReviewListPageOpen ? (
        // TODO: MobileReviewListPage component를 별도의 page로 만들어 routing하기
        <MobileReviewListPage reviews={reviews}/>
      ) : (
        <Container>
          <ReviewHeader>
            <HeaderText>{!isMobile && "전체"} 리뷰</HeaderText>
            <HeaderText>{!isMobile && reviews.total_count}</HeaderText>
          </ReviewHeader>
          <ReviewList>
            {reviews.result.length > 0 ? (
              isMobile ? (
                previewReviews.map((review, index) => (
                  <ReviewItem key={review.id} review={review} />
                ))
              ) : (
                reviews.result.map((review, index) => (
                  <div key={review.id}>
                    <ReviewItem review={review} />
                    {index < reviews.result.length - 1 && <HLine />}
                  </div>
                ))
              )
            ) : (
              <NoReviewMessage>아직 등록된 리뷰가 없어요.<br />첫번째 리뷰의 주인공이 되어보세요!</NoReviewMessage>
            )}
          </ReviewList>
          <MoreReviews onClick={() => handleReviewListPage(true)}>
            <Label>리뷰 더보기</Label>
            <Image
              src="/img/right-arrow-darkgrey.svg"
              alt="리뷰 더보기"
              width={12}
              height={17}
            />
          </MoreReviews>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  border-radius: 10px;
  background-color: var(--Color-Foundation-base-white, #FFF);

  display: flex;
  padding: 24px 28px 36px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;

  @media (max-width: 768px) {
    padding: 33px 16px 65px 16px;
    margin-bottom: 83px;
    gap: 20px;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  @media (max-width: 768px) {
    
  }
`;

const HeaderText = styled.div`
  color: var(--Color-Foundation-gray-900, #262728);

  /* text-16/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */
  
  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);

    /* text-18/Bold */
    font-family: var(--Font-family-sans, NanumSquareOTF);
    font-size: var(--Font-size-18, 18px);
    font-style: normal;
    font-weight: var(--Font-weight-bold, 700);
    line-height: 140%; /* 25.2px */
    letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  overflow-x: auto;
  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const HLine = styled.div`
  margin: 14px 0;
  height: 1px;
  background: var(--Color-Foundation-gray-200, #E5E6E9);
`;

const NoReviewMessage = styled.div<{ $isReviewListPageOpen?: boolean }>`
  padding: 134px 0px 160px 0px;

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */
  
  @media (max-width: 768px) {
    ${(props) =>
    !props.$isReviewListPageOpen &&
    css`
        margin-top: 17px;
        margin-bottom: 0;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
  }
`;

const MoreReviews = styled.div` 
  align-self: stretch;
  display: none;
  @media (max-width: 768px) {
    display: inline-flex;
    justify-content: right;
    align-items: center;
    gap: 11px;
    cursor: pointer;
  }
`;

const Label = styled.div`
  display: none;
  color: var(--Color-Foundation-gray-600, #989AA0);
  text-align: right;

  /* text-12/Bold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-12, 12px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 16.8px */
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  @media (max-width: 768px) {
    display: inherit;
  }
`;
