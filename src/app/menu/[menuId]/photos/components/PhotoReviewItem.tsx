import styled, { ThemeProvider } from "styled-components";
import Stars from "app/menu/[menuId]/components/Stars";
import { ReviewType } from "app/menu/[menuId]/Menu";

export default function PhotoReviewItem({ review }: { review: ReviewType }) {
  return (
    <>
      <ItemContainer>
        <Thumbnail src={review.etc.images[0]} alt="리뷰 이미지" />
        <ReviewInfo>
          <ReviewerIdText>ID {review.user_id}</ReviewerIdText>
          <ReviewDate>{review.created_at.substring(0, 10)}</ReviewDate>
        </ReviewInfo>
        <ReviewContent>{review.comment}</ReviewContent>
        <ReviewScore>
          <ThemeProvider theme={{ width: 73 }}>
            <Stars score={review.score || 0} />
          </ThemeProvider>
          <ReviewScoreValue>{review.score}</ReviewScoreValue>
        </ReviewScore>
      </ItemContainer>
    </>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 192px;
  row-gap: 11px;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  height: 192px;
  width: 192px;
  border-radius: 8px;
  width: 192px;
  height: 192px;
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewerIdText = styled.span`
  font-size: 12px;
  font-weight: 700px;
`;

const ReviewDate = styled.span`
  color: #919191;
  font-size: 10px;
  font-weight: 700;
`;

const ReviewContent = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400px;
`;

const ReviewScore = styled.div`
  height: 14px;
  display: flex;
`;

const ReviewScoreValue = styled.span`
  color: #ff9522;
  font-size: 12px;
  font-weight: 700;
  margin-left: 10px;
`;
