import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import APIendpoint from "../../constants/constants";
import Header from "../../components/Header";
import { ReviewItem } from "../../components/MenuDetail/ReviewItem.";

interface MenuType {
  id: number;
  restaurant_id: number;
  code: string;
  date: string;
  type: string;
  name_kr: string;
  name_en: string;
  price: number;
  etc: string[];
  created_at: string;
  updated_at: string;
  score: number | null;
  review_cnt: number;
}

export interface ReviewType {
  id: number;
  menu_id: number;
  user_id: number;
  score: number | null;
  comment: string;
  etc: {};
  created_at: string;
  updated_at: string;
}

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [menu, setMenu] = useState<MenuType>();

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchMenu() {
      setLoading(true);
      try {
        const res = await axios.get(`${APIendpoint()}/menus/plain/${id}`).then((res) => {
          setMenu(res.data);
        });
      } catch (e) {
        console.log(e);
        router.push("/");
      }
      setLoading(false);
    }
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await axios
          .get(`${APIendpoint()}/reviews/?menu_id=${id}&page=1&per_page=5`)
          .then((res) => {
            setReviews(res.data.result);
          });
      } catch (e) {
        console.log(e);
        router.push("/");
      }
      setLoading(false);
    }
    fetchMenu().then(() => {
      fetchReviews();
    });
  }, [id, setLoading]);

  return (
    <>
      <Header />
      {!isLoading && !!menu && (
        <Info>
          <MenuContainer>
            <div>{menu.name_kr}</div>
          </MenuContainer>
          <ReviewContainer>
            <ReviewHeader>
              <ReviewTitle>리뷰</ReviewTitle>
              <ReviewPostButton>나의 평가 남기기</ReviewPostButton>
            </ReviewHeader>
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ReviewContainer>
        </Info>
      )}
    </>
  );
}

const Info = styled.div`
  display: flex;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 735px;
  right: 0;
  position: absolute;
  border-left: 1px solid #eeeeee;
  padding-left: 50px;
  padding-right: 150px;
  padding-top: 50px;
  height: 100%;
`;

const ReviewTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px 0 24px;
  height: 48px;
  align-items: center;
`;

const ReviewPostButton = styled.button`
  background: #ff9522;
  border-radius: 16px;
  width: 138px;
  height: 32px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  vertical-align: middle;
  line-height: 32px;
  border: none;
  cursor: pointer;
`;
