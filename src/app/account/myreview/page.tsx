"use client";

import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { RawReview } from "types";
import { getMyReviewList } from "utils/api/reviews";
import MyReviewGroup from "./components/MyReviewGroup";

export default function MyReview() {
  const [ reviews, setReviews ] = useState<RawReview[]>([]);
  const mockupReviews: any = [
    {
      restaurant_id: 1,
      name_Kr: "기숙사식당>아워홈",
      name_En: "Dormitory Restaurant > Our Home",
      reviews: [
        {
          created_at: "2025-06-28T19:33:49+09:00",
          updated_at: "2025-06-28T19:33:49+09:00",
          id: 429,
          menu_id: 142075,
          name_kr: "치킨마요덮밥&불닭소스꼬치어묵",
          user_id: 11303,
          score: 3,
          comment: "그냥 저냥 먹을만한가?",
          etc: null,
        },
        {
          created_at: "2025-06-28T19:33:49+09:00",
          updated_at: "2025-06-28T19:33:49+09:00",
          id: 430,
          menu_id: 142075,
          name_kr: "치킨마요덮밥&불닭소스꼬치어묵",
          user_id: 11303,
          score: 3,
          comment: "학교 생활의 낙을 담당하는 맛!! 이거 먹으려고 학교 다닙니다 ㅎㅎ 학교 생활의 낙을 담당하는 맛!! 이거 먹으려고 학교 다닙니다 ㅎㅎ 학교 생활의 낙을 담당하는 맛!! 이거 먹으려고 학교 다닙니다 ㅎㅎ 학교 생활의 낙을 담당하는 맛!! 이거 먹으려고 학교 다닙니다 ㅎㅎ 학교 생활의 낙을 담당하는 맛!! 이거 먹으려고 학교 다닙니다 ㅎㅎ ",
          keywords: ["또 먹고 싶어요", "가성비 좋아요", "알찬 편이에요"],
          etc: null,
        },
      ]
    },
    {
      restaurant_id: 2,
      name_Kr: "학생회관식당",
      name_En: "Student Union Restaurant",
      reviews: [
        {
          created_at: "2025-03-10T10:28:30+09:00",
          updated_at: "2025-03-10T10:28:30+09:00",
          id: 4290,
          menu_id: 121039,
          name_kr: "콩나물밥&부추양념장",
          user_id: 11303,
          score: 5,
          comment: "test",
          etc: {
            images: [ "https://siksha-dev.s3.ap-northeast-2.amazonaws.com/review-images/menu-121039/user-11303/0.jpeg" ],
          },
        },
      ]
    },
    {
      restaurant_id: 3,
      name_Kr: "버거운버거",
      name_En: "Burger Un Burger",
      reviews: [
        {
          created_at: "2025-03-09T22:22:08+09:00",
          updated_at: "2025-03-09T22:22:08+09:00",
          id: 4285,
          menu_id: 120347,
          name_kr: "버거운치킨버거",
          user_id: 11303,
          score: 5,
          comment: "dd",
          keywords: ["또 먹고 싶어요", "가성비 좋아요", "알찬 편이에요"],
          etc: {
            images: [ "https://siksha-dev.s3.ap-northeast-2.amazonaws.com/review-images/menu-120347/user-11303/0.jpeg" ]
          },
        },
      ]
    },
  ];
  
  const router = useRouter();
  const { authStatus, getAccessToken, authGuard } = useAuth();
  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  const fetchMyReviews = (size: number, page: number) =>
    getAccessToken()
      .then((accessToken) => getMyReviewList(accessToken, size, page))
      .then(({ result, hasNext }) => {
        result.map((rawReview) => setReviews((prev) => [...prev, rawReview]));
        return hasNext;
      })
      .catch(onHttpError);

  useEffect(() => {
    setReviews([]);
  }, []);

  // for debugging purposes
  useEffect(() => {
    if (reviews.length > 0) {
      console.log("My reviews fetched:", reviews);
    } else if (authStatus === "login") {
      fetchMyReviews(10, 1);
    }
  }, [reviews]);

  if (authStatus === "login") {
    return (
      <>
        <MobileSubHeader title="나의 평가 관리" handleBack={router.back} />
        <Container>
          <Header>나의 평가 관리</Header>
            <MyReviewsContainer>
            {mockupReviews.map((reviewGroup) => (
              <MyReviewGroup
                key={reviewGroup.restaurant_id}
                restaurantName={reviewGroup.name_Kr}
                reviews={reviewGroup.reviews}
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
  border: 1px solid #e8e8e8;
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
`;