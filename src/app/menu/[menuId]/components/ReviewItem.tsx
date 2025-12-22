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
import UseCurrentTheme from "hooks/UseCurrentTheme";
import useError from "hooks/useError";
export default function ReviewItem({ review: initialReview }: { review: ReviewType }) {
  const [review, setReview] = useState(initialReview);
  const isMobile = useIsMobile();
  const IMAGE_SIZE = isMobile ? 102 : 80;
  const { getAccessToken } = useAuth();
  const { currentTheme } = UseCurrentTheme();
  const isDark = currentTheme === "dark";
  const { onHttpError } = useError();

  const handleReviewLike = async () => {
    const accessToken = await getAccessToken();
    console.debug(accessToken);
    try {
      if (review.is_liked) {
        await setReviewUnlike(review.id, accessToken); // 서버 요청
        // 성공 시 UI 업데이트
        setReview({
          ...review,
          is_liked: false,
          like_count: review.like_count - 1,
        });
      } else {
        await setReviewLike(review.id, accessToken); // 서버 요청
        // 성공 시 UI 업데이트
        setReview({
          ...review,
          is_liked: true,
          like_count: review.like_count + 1,
        });
      }
    } catch (err) {
      console.error(err);
      onHttpError(err, { preventNavigation: true });
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
        <Date>
          {isMobile
            ? formatReviewDate(review.created_at.substring(0, 10))
            : review.created_at.substring(0, 10)}
        </Date>
      </Header>
      <Body>
        <Content>
          <CommentReviewWrapper>
            <CommentWrapper isDark={isDark}>
              <Comment isDark={isDark}>{review.comment}</Comment>
            </CommentWrapper>
            {isMobile && (
              <ReviewLikes
                count={review.like_count}
                isLiked={review.is_liked}
                onClick={handleReviewLike}
              />
            )}
          </CommentReviewWrapper>
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
          {!isMobile && (
            <ReviewLikes
              count={review.like_count}
              isLiked={review.is_liked}
              onClick={handleReviewLike}
            />
          )}
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

  @media (max-width: 768px) {
    padding-left: 15.5px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const Comment = styled.div<{ isDark: boolean }>`
  display: flex;
  position: relative;
  padding: 4px 24px 4px 0px;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 1;
  min-width: 0;

  color: var(--Color-Foundation-gray-900, #262728);

  /* text-15/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-15, 15px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 22.5px */

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);

    /* text-13/Regular */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-13, 13px);
    font-style: normal;
    font-weight: var(--Font-weight-regular, 400);
    line-height: 140%; /* 18.2px */
    letter-spacing: var(--Font-letter-spacing-0, -0.3px);
    padding: 0;
  }
`;

const CommentWrapper = styled.div<{ isDark: boolean }>`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  max-width: 100%;
  gap: 0;
  @media (max-width: 768px) {
    background-image: ${({ isDark }) =>
      isDark ? 'url("/img/review-comment-dark.svg")' : 'url("/img/review-comment-light.svg")'};
    background-repeat: no-repeat; /* 세로로만 반복 */
    background-size: 100% 100%; /* 가로는 꽉 채우고, 세로는 자동 */
    background-position: center;
    background-origin: border-box;
    padding: 10px 20px 10px 23px;
  }
`;
const CommentReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.5px;
  align-items: center;
  width: 100%;
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
