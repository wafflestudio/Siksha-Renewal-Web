import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginModal from "components/Auth/LoginModal";
import { ReviewItem } from "components/MenuDetail/ReviewItem.";
import ReviewDistribution from "components/MenuDetail/ReviewDistribution";
import ReviewPostModal from "components/MenuDetail/ReviewPostModal";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import ReviewImageSwiper from "components/MenuDetail/ReviewImageSwiper";
import Link from "next/link";
import Likes from "components/MenuDetail/Likes";
import Image from "next/image";
import MobileNavigationBar from "components/MobileNavigationBar";
import { getMenu } from "utils/api/menus";
import { getRestaurantList } from "utils/api/restaurants";
import { getReviews, getReviewScore } from "utils/api/reviews";
import { useSearchParams } from 'next/navigation'

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
  is_liked: boolean;
  like_cnt: number;
}

export interface ReviewType {
  id: number;
  menu_id: number;
  user_id: number;
  score: number | null;
  comment: string;
  etc: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ReviewListType {
  result: ReviewType[];
  total_count: number;
}

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const searchParams = useSearchParams();
  const writeReview = !!searchParams.get('writeReview');
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewListType>({
    result: [],
    total_count: 0,
  });
  const [menu, setMenu] = useState<MenuType>();
  const [images, setImages] = useState<string[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [reviewDistribution, setReviewDistribution] = useState<number[]>([]);
  const [isReviewPostModalOpen, setReviewPostModalOpen] = useState(writeReview);

  const state = useStateContext();
  const { isLoginModal } = state;
  const { setLoginModal } = useDispatchContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchReview = () => {
      setLoading(true);

      getReviews(Number(id))
        .then(({ totalCount, result }) => {
          setReviews({
            result,
            total_count: totalCount,
          });
        })
        .catch((e) => {
          router.push("/");
        })
        .finally(() => setLoading(false));
    };

    const fetchMenu = () => {
      setLoading(true);
      getMenu(Number(id))
        .then((data) => {
          setMenu(data);
          fetchReview();
          fetchRestaurantName({
            restaurantId: data.restaurant_id,
          });
          fetchReviewDistribution({
            menuId: data.id,
          });
        })
        .catch((e) => {
          console.error(e);
          router.push("/");
        })
        .finally(() => setLoading(false));
    };

    const fetchRestaurantName = async ({ restaurantId }: { restaurantId: number }) => {
      try {
        getRestaurantList().then((data) => {
          const restaurantName = data.result.find((restaurant) => restaurant.id === restaurantId);
          if (restaurantName) setRestaurantName(restaurantName.name_kr);
        });
      } catch (e) {
        console.error(e);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviewDistribution = async ({ menuId }: { menuId: number }) => {
      try {
        getReviewScore(menuId).then((dist) => {
          setReviewDistribution(dist);
        });
      } catch (e) {
        console.error(e);
        router.push("/");
      }
    };

    fetchMenu();
  }, [id, setLoading]);

  useEffect(() => {
    var updatedImages: string[] = [];
    reviews.result.map((review) => {
      if (review.etc) {
        updatedImages = updatedImages.concat(review.etc.images);
      }
    });
    const SWIPER_IMAGES_LIMIT = 10;
    if (updatedImages.length > SWIPER_IMAGES_LIMIT) {
      updatedImages = updatedImages.slice(0, SWIPER_IMAGES_LIMIT);
    }
    while (updatedImages.length > 0 && updatedImages.length <= SWIPER_IMAGES_LIMIT) {
      updatedImages = updatedImages.concat(updatedImages);
    }
    setImages(updatedImages);
  }, [reviews]);

  const handleReviewPostButtonClick = () => {
    if (!!localStorage.getItem("access_token")) {
      setReviewPostModalOpen(true);
    } else {
      setLoginModal(true);
    }
  };

  return (
    <>
      {isLoginModal && <LoginModal />}
      {!isLoading && !!menu && (
        <>
          <Info>
            <MenuContainer>
              {images.length > 0 && <ReviewImageSwiper images={images} />}
              <MenuInfoContainer>
                <MenuHeader>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <MenuTitle>{menu.name_kr}</MenuTitle>
                    <MenuSubTitle>{restaurantName}</MenuSubTitle>
                  </div>
                  <Likes menu={menu} />
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
                <ReviewPostButton onClick={handleReviewPostButtonClick} mobile={true}>
                  나의 평가 남기기
                </ReviewPostButton>
                <ReviewHeader>
                  <div style={{ display: "flex" }}>
                    <ReviewTitle>리뷰</ReviewTitle>
                    <ReviewTotalCount>{reviews.total_count}</ReviewTotalCount>
                  </div>
                  <Link href={`/menu/${id}/photos`} style={{ textDecoration: "none" }}>
                    <ImageReviewButton>
                      <ImageReviewButtonText>사진 리뷰 모아보기</ImageReviewButtonText>
                      <Image
                        src="/img/right-arrow-grey.svg"
                        alt="오른쪽 화살표"
                        width={10}
                        height={16}
                      />
                    </ImageReviewButton>
                  </Link>
                </ReviewHeader>
                <ReviewList>
                  {reviews.result.length > 0 &&
                    reviews.result.map((review) => <ReviewItem key={review.id} review={review} />)}
                  {reviews.result.length === 0 && <div>리뷰가 없습니다.</div>}
                </ReviewList>
                <ReviewPostButton onClick={handleReviewPostButtonClick} mobile={false}>
                  나의 평가 남기기
                </ReviewPostButton>
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
          <MobileNavigationBar />
        </>
      )}
    </>
  );
}

const Info = styled.div`
  background-color: white;
  display: flex;
  height: max(910px, 100vh);
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
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38%;
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
  align-items: last baseline;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MenuTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #ff9522;
  margin-right: 32px;
  margin-left: 7px;
  max-width: 400px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0;
  }
`;

const MenuSubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #ff9522;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

const ReviewPostButton = styled.button<{ mobile: boolean }>`
  background: #ff9522;
  color: white;
  text-align: center;
  padding: 10px 25px;
  border: none;
  margin-bottom: 17px;
  cursor: pointer;
  ${(props) =>
    props.mobile
      ? css`
          display: none;
          position: inherit;
          width: 200px;
          height: 32px;
          font-size: 14px;
          font-weight: 800;
          line-height: 16px;
          border-radius: 50px;
          @media (max-width: 768px) {
            display: inline-block;
          }
        `
      : css`
          font-size: 16px;
          font-weight: 700;
          line-height: 18px;
          border-radius: 5px;
          @media (max-width: 768px) {
            display: none;
          }
        `}
`;
