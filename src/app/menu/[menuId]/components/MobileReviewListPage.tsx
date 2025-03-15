import styled, { css } from "styled-components";
import ReviewItem from "./ReviewItem";
import { ReviewListType } from "../Menu";

export default function MobileReviewListPage({
  reviews
}: { reviews: ReviewListType }) {
  return (
    <Container>
      <ReviewList>
        {reviews.result.length > 0 ? (
          reviews.result.map((review) => <ReviewItem key={review.id} review={review} />)
        ) : (
          <NoReviewMessage>
            아직 등록된 리뷰가 없어요.
          </NoReviewMessage>
        )}
      </ReviewList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  min-height: calc(100vh - 60px);
  padding: 24px 16px;
  width: 100vw;
  box-sizing: border-box;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  overflow-x: auto;
  gap: 32px;
`;


const NoReviewMessage = styled.div<{ $isReviewListPageOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  padding: 134px 0px 160px 0px;
  margin-top: 17px;
  margin-bottom: 0;

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;