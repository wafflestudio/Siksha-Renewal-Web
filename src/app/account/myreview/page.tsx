"use client";

import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MyReviewGroupType, RawReview } from "types";
import { getMyReviewList } from "utils/api/reviews";
import MyReviewGroup from "./components/MyReviewGroup";

export default function MyReview() {
  const [reviews, setReviews] = useState<MyReviewGroupType[]>([]);
  const router = useRouter();
  const { authStatus, getAccessToken, authGuard } = useAuth();
  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  const fetchMyReviews = (size: number, page: number) =>
    getAccessToken()
      .then((accessToken) => {
        return getMyReviewList(accessToken, size, page);
      })
      .then(({ result, hasNext }) => {
        result.forEach((myReviewGroup) =>
          setReviews((prev) => {
            // TODO: 리뷰가 중복되어 추가되는 문제를 임시로 방지하는 코드
            // 원천적으로 중복된 api call을 막도록 개선해야 함
            if (prev.some((group) => group.restaurant_id === myReviewGroup.restaurant_id)) {
              return prev;
            }
            return [...prev, myReviewGroup];
          }),
        );
        return hasNext;
      })
      .catch(onHttpError);

  // TODO: 리뷰를 비롯한 모든 서버 데이터는 react-query로 관리해야 함
  useEffect(() => {
    if (reviews.length == 0 && authStatus === "login") {
      fetchMyReviews(100, 1);
    }
  }, [reviews, authStatus]);

  if (authStatus === "login") {
    return (
      <>
        <MobileSubHeader title="나의 평가 관리" handleBack={router.back} />
        <Container>
          <Header>나의 평가 관리</Header>
          <MyReviewsContainer>
            {reviews.map((reviewGroup, index) => (
              <MyReviewGroup
                key={reviewGroup.restaurant_id}
                restaurantName={reviewGroup.name_kr}
                reviews={reviewGroup.reviews}
                isFirst={index === 0}
              />
            ))}
          </MyReviewsContainer>
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  padding: 0 18.5px 18.5px;
  width: 701px;
  background: var(--SemanticColor-Background-Primary, #ffffff);
  border: 1px solid var(--SemanticColor-Border-Primary);
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100% - 16px);
    margin-top: 20px;
    background: transparent;
    border: 0;
    padding: 0;
  }
`;

const Header = styled.div`
  margin: 24.08px 0 29.42px 4.5px;
  color: var(--Color-Foundation-orange-500, #ff9522);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MyReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;
