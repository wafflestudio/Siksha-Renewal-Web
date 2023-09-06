import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import APIendpoint from "../../constants/constants";
import Header from "../../components/Header";
import { ReviewItem } from "../../components/MenuDetail/ReviewItem.";
import ReviewDistribution from "../../components/MenuDetail/ReviewDistribution";
import { set } from "lodash";
import ReviewPostModal from "../../components/MenuDetail/ReviewPostModal";
import { GlobalStyle } from "../../styles/globalstyle";

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

interface ReviewListType {
  result: ReviewType[];
  total_count: number;
}

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewListType>({
    result: [],
    total_count: 0,
  });
  const [menu, setMenu] = useState<MenuType>();
  const [restaurantName, setRestaurantName] = useState("");
  const [reviewDistribution, setReviewDistribution] = useState<number[]>([]);
  const [isReviewPostModalOpen, setReviewPostModalOpen] = useState(false);

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
          fetchReviewDistribution({
            menuId: res.data.id,
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
          .get(`${APIendpoint()}/reviews/?menu_id=${id}&page=1&per_page=100`)
          .then((res) => {
            setReviews(res.data);
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

    const fetchReviewDistribution = async ({ menuId }: { menuId: number }) => {
      try {
        await axios.get(`${APIendpoint()}/reviews/dist?menu_id=${menuId}`).then((res) => {
          setReviewDistribution(res.data.dist);
        });
      } catch (e) {
        console.log(e);
        router.push("/");
      }
    };

    fetchMenu();
  }, [id, setLoading, isReviewPostModalOpen]);

  const handleReviewPostButtonClick = () => {
    setReviewPostModalOpen(true);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      {!isLoading && !!menu && (
        <Info>
          <MenuContainer>
            <MenuHeader>
              <MenuTitle>{menu.name_kr}</MenuTitle>
              <MenuSubTitle>{restaurantName}</MenuSubTitle>
            </MenuHeader>
            <ReviewDistribution
              totalReviewCount={reviews.total_count}
              score={menu.score || 0}
              distribution={reviewDistribution}
            />
          </MenuContainer>
          {!isReviewPostModalOpen && (
            <ReviewContainer>
              <ReviewHeader>
                <ReviewTitle>리뷰</ReviewTitle>
                <ReviewPostButton onClick={handleReviewPostButtonClick}>
                  나의 평가 남기기
                </ReviewPostButton>
              </ReviewHeader>
              <ReviewList>
                {reviews.result.length > 0 &&
                  reviews.result.map((review) => <ReviewItem key={review.id} review={review} />)}
                {reviews.result.length === 0 && <div>리뷰가 없습니다.</div>}
              </ReviewList>
            </ReviewContainer>
          )}
          {isReviewPostModalOpen && (
            <ReviewPostModal
              isOpen={isReviewPostModalOpen}
              menu={{
                menuName: menu.name_kr,
                menuId: menu.id,
              }}
              onClose={() => setReviewPostModalOpen(false)}
            />
          )}
        </Info>
      )}
    </>
  );
}

const Info = styled.div`
  display: flex;
`;

const MenuContainer = styled.div`
  padding-top: 40px;
  left: calc((100vw - 1200px) / 2);
  position: absolute;
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
  padding-right: 50px;
  padding-top: 50px;
  min-height: 100%;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 800px;
  overflow-y: scroll;
  overflow-x: auto;
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
  max-width: 450px;
  word-break: keep-all;
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
