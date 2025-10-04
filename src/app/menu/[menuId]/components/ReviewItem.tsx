import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Stars from "./Stars";
import { ReviewType } from "app/menu/[menuId]/Menu";
import Image from "next/image";
import { formatReviewDate } from "utils/FormatUtil";
import useIsMobile from "hooks/UseIsMobile";
import KeywordReviewChips from "./KeywordReviewChips";
import ReviewLikes from "./ReviewLikes";
import { setReviewLike, setReviewUnlike } from "utils/api/reviews";
import useAuth from "hooks/UseAuth";

export default function ReviewItem({ review: initialReview }: { review: ReviewType }) {
  const [review, setReview] = useState(initialReview);
  const isMobile = useIsMobile();
  const IMAGE_SIZE = isMobile ? 102 : 80;
  const { getAccessToken } = useAuth();

  const handleReviewLike = async () => {
    const accessToken = await getAccessToken();
    try {
      if (review.is_liked) {
        // UI 먼저 업데이트
        setReview({
          ...review,
          is_liked: false,
          like_count: review.like_count - 1,
        });
        await setReviewUnlike(review.id, accessToken); // 서버 요청
      } else {
        setReview({
          ...review,
          is_liked: true,
          like_count: review.like_count + 1,
        });
        await setReviewLike(review.id, accessToken); // 서버 요청
      }
    } catch (err) {
      console.error(err);
      // 실패 시 rollback 필요하면 setReview로 원래 값 복원
    }
  };

  return (
    <Container>
      <Header>
        <Profile src={"/img/default-profile.svg"} alt="프로필 이미지" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: "1 0 0",
          }}
        >
          <Id>ID {review.user_id}</Id>
          <ThemeProvider theme={{ width: 60 }}>
            <Stars score={review.score || 0} />
          </ThemeProvider>
        </div>
        <Date>{review.created_at.substring(0, 10)}</Date>
      </Header>
      <Body>
        <Content>
          <Comment>{review.comment}</Comment>
          <KeywordReviewChips keywords={review.keyword_reviews} />
          {Array.isArray(review.etc?.images) && (
            <Images>
              {review.etc.images.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt="리뷰 이미지"
                  width={IMAGE_SIZE}
                  height={IMAGE_SIZE}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Images>
          )}
          {/* ReviewLikes 클릭 이벤트 연결 */}
          <ReviewLikes
            count={review.like_count}
            isLiked={review.is_liked}
            onClick={handleReviewLike}
          />
        </Content>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  align-self: stretch;
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const Body = styled.div`
  display: flex;
  padding-left: 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const Comment = styled.div`
  display: flex;
  padding: 4px 24px 4px 0px;
  align-items: flex-start;
  align-self: stretch;

  color: var(--Color-Foundation-gray-900, #262728);

  /* text-15/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-15, 15px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 22.5px */

  @media (max-width: 768px) {
    border-radius: 8px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin: 8px 0 6px 0;
    background-color: var(--SemanticColor-Background-Secondary);
    color: var(--Color-Foundation-base-black, #000);

    /* text-13/Regular */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-13, 13px);
    font-style: normal;
    font-weight: var(--Font-weight-regular, 400);
    line-height: 140%; /* 18.2px */
    letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  }
`;

const Images = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  margin-top: 10px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const Id = styled.div`
  color: var(--Color-Foundation-gray-800, #cbcbcc);

  /* text-13/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 18.2px */
`;

const Date = styled.div`
  color: var(--Color-Foundation-gray-600, #989aa0);
  text-align: right;

  /* text-12/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-12, 12px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 16.8px */

  @media (max-width: 768px) {
    color: var(--Color-Foundation-gray-600, #989aa0);
    text-align: right;

    /* text-12/Bold */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-12, 12px);
    font-style: normal;
    font-weight: var(--Font-weight-bold, 700);
    line-height: 140%; /* 16.8px */
    letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  }
`;
