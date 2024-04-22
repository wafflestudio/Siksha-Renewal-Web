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
import ContextProvider from "../../hooks/ContextProvider";
import ReviewImageSwiper from "../../components/MenuDetail/ReviewImageSwiper";
import Link from "next/link";

interface MenuType {
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
}

export interface ReviewType {
  id: number;
  menu_id: number;
  user_id: number;
  score: number | null;
  comment: string;
  etc: ReviewEtcType | null;
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

interface ReviewEtcType {
  images: string[];
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
  const [images, setImages] = useState<string[]>([]);
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

  useEffect(() => {
    var updatedImages: string[] = [];
    reviews.result.map((review) => {
      if(review.etc) {
        updatedImages = updatedImages.concat(review.etc.images);
      }
    });
    // TODO: 일단 스와이퍼에 들어갈 이미지 수를 10장으로 제한했는데, 풀어도 별 상관 없을까?
    if(updatedImages.length > 10) {
      updatedImages = updatedImages.slice(0, 10);
    }
    setImages(updatedImages);
  }, [reviews]);

  const handleReviewPostButtonClick = () => {
    if (!!localStorage.getItem("access_token")) {
      setReviewPostModalOpen(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <Header />
      </ContextProvider>
      {!isLoading && !!menu && (
        <Info>
          <MenuContainer>
            {images.length > 0 && <ReviewImageSwiper images={images} />}
            <MenuInfoContainer>
              <MenuHeader>
                <MenuTitleContainer>
                  <MenuTitle>{menu.name_kr}</MenuTitle>
                  <MenuSubTitle>{restaurantName}</MenuSubTitle>
                </MenuTitleContainer>
              </MenuHeader>
              <HLine />
              <ReviewDistribution
                totalReviewCount={reviews.total_count}
                score={menu.score || 0}
                distribution={reviewDistribution}
              />
            </MenuInfoContainer>
          </MenuContainer>
          {!isReviewPostModalOpen && (
            <ReviewContainer>
              <ReviewPostButton onClick={handleReviewPostButtonClick}>
                나의 평가 남기기
              </ReviewPostButton>
              <ReviewHeader>
                <ReviewTitleContainer>
                  <ReviewTitle>리뷰</ReviewTitle>
                  <ReviewTotalCount>{reviews.total_count}</ReviewTotalCount>
                </ReviewTitleContainer>
                <Link href="#" style={{ textDecoration: 'none' }}>
                  <ImageReviewButton>
                    <ImageReviewButtonText>사진 리뷰 모아보기</ImageReviewButtonText>
                    <img src="/img/right-arrow-grey.svg" />
                  </ImageReviewButton>
                </Link>
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
  background-color: white;
  display: flex;
  height: max(100vh, 910px);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MenuContainer = styled.section`
  background-color: white;
  flex-grow: 1;
  @media (max-width: 768px) {
    flex-grow: 0;
    width: auto;
  }
`;

const MenuInfoContainer = styled.div`
  padding: 37px 30px 26px calc(max((100vw - 1155px), 0px) / 2);
  @media (max-width: 768px) {
    padding: 19px 15px 18px 17px;
  }
`;

const ReviewContainer = styled.section`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  width: 37%;
  right: 0;
  border-left: 1px solid #eeeeee;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 36px;
  @media (max-width: 768px) {
    flex-grow: 1;
    width: auto;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 0;
  }
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
  align-items: baseline;
  @media (max-width: 768px) {
    justify-content: space-around
  }
`;

const MenuTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const MenuTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #ff9522;
  margin-right: 32px;
  margin-left: 7px;
  max-width: 450px;
  word-break: keep-all;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0;
  }
`;

const MenuSubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #ff9522;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HLine = styled.div`
  width: 100%;
  height: 1px;
  background: #fe8c59;
  margin: 10px auto 10px auto;
`;

const ReviewTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const ReviewTotalCount = styled.div`
  margin-left: 7px;
  padding-top: 2px;
  font-weight: 800;
  color: #ff9522;
`;

const ImageReviewButton = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const ImageReviewButtonText = styled.div`
  color: #919191;
  margin-right: 12px;
  font-size: 14px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px 0 24px;
  align-items: center;
  margin-bottom: 40px;
`;

const ReviewPostButton = styled.button`
  position: fixed;
  bottom: 0;
  background: #ff9522;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  line-height: 18px;
  padding: 10px 25px;
  border: none;
  margin-bottom: 17px;
  cursor: pointer;
  @media (max-width: 768px) {
    position: inherit;
    border-radius: 50px;
    width: 200px;
    height: 32px;
    font-size: 14px;
    font-weight: 800;
    line-height: 16px;
    padding: 0;
  }
`;