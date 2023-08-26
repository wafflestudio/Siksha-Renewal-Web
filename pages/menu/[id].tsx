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

interface RestaurantType {
  id: number;
  code: string;
  name_kr: string;
  name_en: string;
  addr: string;
  tel: string;
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
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchMenu() {
      setLoading(true);
      try {
        const res = await axios.get(`${APIendpoint()}/menus/plain/${id}`).then((res) => {
          setMenu(res.data);
          fetchReviews();
          fetchRestaurantName({
            restaurantId: res.data.restaurant_id,
          });
        });
      } catch (e) {
        console.log(e);
        router.push("/");
      }
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
      } finally {
        setLoading(false);
      }
    }

    const fetchRestaurantName = async ({ restaurantId }: { restaurantId: number }) => {
      try {
        await axios.get(`${APIendpoint()}/restaurants/`).then((res) => {
          const restaurantName = res.data.result.find(
            (restaurant) => restaurant.id === restaurantId,
          );
          setRestaurantName(restaurantName.name_kr);
        });
      } catch (e) {
        console.log(e);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id, setLoading]);

  return (
    <>
      <Header />
      {!isLoading && !!menu && (
        <Info>
          <MenuContainer>
            <MenuHeader>
              <MenuTitle>{menu.name_kr}</MenuTitle>
              <MenuSubTitle>{restaurantName}</MenuSubTitle>
            </MenuHeader>
          </MenuContainer>
          <ReviewContainer>
            <ReviewHeader>
              <ReviewTitle>리뷰</ReviewTitle>
              <ReviewPostButton>나의 평가 남기기</ReviewPostButton>
            </ReviewHeader>
            {reviews.length > 0 &&
              reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
            {reviews.length === 0 && <div>리뷰가 없습니다.</div>}
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
  padding-top: 40px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  right: 0;
  position: absolute;
  border-left: 1px solid #eeeeee;
  padding-left: 50px;
  padding-right: 150px;
  padding-top: 50px;
  min-height: 100%;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const MenuTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #ff9522;
  margin-right: 32px;
  margin-left: 32px;
`;

const MenuSubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #ff9522;
  vertical-align: bottom;
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
  margin-bottom: 40px;
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
