import styled, { css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import APIendpoint from "../../constants/constants";
import LoginModal from "../../components/Auth/LoginModal";
import Header from "../../components/Header";
import { ReviewItem } from "../../components/MenuDetail/ReviewItem.";
import ReviewDistribution from "../../components/MenuDetail/ReviewDistribution";
import ReviewPostModal from "../../components/MenuDetail/ReviewPostModal";
import { GlobalStyle } from "../../styles/globalstyle";
import { useDispatchContext, useStateContext } from "../../hooks/ContextProvider";
import ReviewImageSwiper from "../../components/MenuDetail/ReviewImageSwiper";
import Link from "next/link";
import Likes from "../../components/MenuDetail/Likes";
import MobileSubHeader from "components/MobileSubHeader";
import MobileReviewImageSwiper from "components/MenuDetail/MobileReviewImageSwiper";

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
  const [restaurantName, setRestaurantName] = useState("");
  const [reviewDistribution, setReviewDistribution] = useState<number[]>([]);
  const [isReviewPostModalOpen, setIsReviewPostModalOpen] = useState(false);

  const state = useStateContext();
  const { isLoginModal } = state;
  const { setLoginModal } = useDispatchContext();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);
  const [isOverflow, setIsOverflow] = useState(false);
  const menuTitleDivRef = useRef<HTMLDivElement>(null);

  const SWIPER_IMAGES_LIMIT = 5;
  const MOBILE_IMAGE_LIST_LIMIT = 5;
  const [images, setImages] = useState<string[]>([]);
  const [imageCount, SetImageCount] = useState<number>(0);

  const [mobileSubHeaderTitle, SetMobileSubHeaderTitle] = useState<string>("");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchMenu() {
      setLoading(true);
      try {
        const res = await axios.get(`${APIendpoint()}/menus/plain/${id}`).then((res) => {
          setMenu(res.data);
          SetMobileSubHeaderTitle(res.data.name_kr);
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
  }, [id, setLoading]);

  useEffect(() => {
    var updatedImages: string[] = [];
    reviews.result.map((review) => {
      if (review.etc) {
        updatedImages = updatedImages.concat(review.etc.images);
      }
    });
    setImages(updatedImages);
    SetImageCount(updatedImages.length);
  }, [reviews]);

  const handleReviewPostButtonClick = () => {
    if (!!localStorage.getItem("access_token")) {
      handleReviewPostModal(true);
    } else {
      setLoginModal(true);
    }
  };

  const handleReviewPostModal = (isOpen: boolean) => {
    if (!menu) {
      console.error('menu is not loaded');
      return;
    }
    SetMobileSubHeaderTitle(isOpen ? "나의 평가 남기기" : menu.name_kr);
    setIsReviewPostModalOpen(isOpen);
  }

  const handleMobileSubHeaderBack = () => {
    if(isReviewPostModalOpen) { 
      handleReviewPostModal(false);
    } else {
      router.push('/');
    }
  }

  useEffect(() => {
    if (menuTitleDivRef.current) {
      const { current } = menuTitleDivRef
      const { offsetWidth, scrollWidth } = current
      setIsOverflow(offsetWidth < scrollWidth)
    }
  }, [menuTitleDivRef.current])

  return (
    <>
      <GlobalStyle />
      {isLoginModal && <LoginModal />}
      <Header />
      {!isLoading && !!menu && (
        <>
          <MobileSubHeader title={mobileSubHeaderTitle} handleBack={handleMobileSubHeaderBack} />
          <Info>
            <Padding />
            <MenuContainer>
              {images.length > 0 && <ReviewImageSwiper images={images} swiperImagesLimit={SWIPER_IMAGES_LIMIT} imageCount={imageCount} />}
              <MenuInfoContainer>
                <MenuHeader>
                  <MenuTitleContainer>
                    <MenuTitleWrapper>
                      <MenuTitle isOpen={isAccordionOpen} ref={menuTitleDivRef}>{menu.name_kr}</MenuTitle>
                      <MenuTitleAccordionButton isOpen={isAccordionOpen} isTitleLong={isOverflow} onClick={toggleAccordion} />
                    </MenuTitleWrapper>
                    <MenuSubTitle>{restaurantName}</MenuSubTitle>
                  </MenuTitleContainer>
                  <Likes menu={menu} />
                </MenuHeader>
                <HLine />
                <ReviewDistribution
                  totalReviewCount={reviews.total_count}
                  score={menu.score || 0}
                  distribution={reviewDistribution}
                />
              </MenuInfoContainer>
              <ReviewPostButton onClick={handleReviewPostButtonClick} mobile={true}>
                나의 평가 남기기
              </ReviewPostButton>
            </MenuContainer>
            <MobileHLine />
            {!isReviewPostModalOpen && (
              <ReviewContainer>
                <ReviewHeader>
                  <MobilePhotoReviewHeader>
                    <MobilePhotoReviewTitle>사진 리뷰 모아보기</MobilePhotoReviewTitle>
                    <Link href="#" style={{ textDecoration: "none" }}>
                      <PhotoReviewButton>
                        <PhotoReviewButtonText>사진 리뷰 모아보기</PhotoReviewButtonText>
                        <img
                          src="/img/right-arrow-darkgrey.svg"
                          alt="사진 리뷰 모아보기"
                        />
                      </PhotoReviewButton>
                    </Link>
                  </MobilePhotoReviewHeader>
                  <MobileReviewImageSwiper images={images} swiperImagesLimit={MOBILE_IMAGE_LIST_LIMIT} imageCount={imageCount} />
                  <MobileReviewHeader>
                    <div style={{ display: "flex" }}>
                      <ReviewTitle>리뷰</ReviewTitle>
                      <ReviewTotalCount>{reviews.total_count}</ReviewTotalCount>
                    </div>
                    <MoreReviewsButtonImage src="/img/right-arrow-darkgrey.svg" alt="리뷰 더보기" />
                  </MobileReviewHeader>
                </ReviewHeader>
                <ReviewList>
                  {reviews.result.length > 0
                    ? reviews.result.map((review) => <ReviewItem key={review.id} review={review} />)
                    : <NoReviewMessage>아직 등록된 리뷰가 없어요.</NoReviewMessage>
                  }
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
                onClose={() => handleReviewPostModal(false)}
              />
            )}
            <Padding />
          </Info>
        </>
      )}
    </>
  );
}

const Info = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  height: max(809px, calc(100vh - 271px));
  @media (max-width: 768px) {
    flex-direction: column;
    height: max(724px, calc(100vh - 60px));
  }
`;

const MenuContainer = styled.section`
  position: relative;
  background-color: white;
  width: 1185px;
  @media (max-width: 768px) {
    flex-grow: 0;
    width: auto;
    min-width: 0;
    margin-left: 0;
  }
`;

const MenuInfoContainer = styled.div`
  padding: 41px 30px 26px 258px;
  width: 897px;
  margin-left: auto;
  @media (max-width: 768px) {
    padding: 18px 15px 16px 17px;
    width: auto;
    margin-left: 0;
  }
`;

const ReviewContainer = styled.section`
  position: relative;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 735px;
  border-left: 1px solid #eeeeee;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 36px;
  @media (max-width: 768px) {
    flex-grow: 1;
    width: auto;
    min-width: 0;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 0;
    margin-right: 0;
  }
`;

const MobileHLine = styled.div`
  display: none;
  background: #9191911A;
  padding: 5px 0;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  overflow-x: auto;
`;

const NoReviewMessage = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #797979;
  margin: 300px 0;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: last baseline;
  padding-bottom: 13px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 18px;
  }
`;

const MenuTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 9.2px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const MenuTitle = styled.div<{ isOpen: boolean }>`
  font-size: 40px;
  font-weight: 700;
  color: #ff9522;
  line-height: 45.4px;
  margin-right: 3px;
  margin-left: 7px;
  width: ${props => props.isOpen ? '492px' : 'auto'};
  max-width: 492px;
  text-overflow: ellipsis;
  white-space: ${props => props.isOpen ? 'normal' : 'nowrap'};
  word-break: break-word;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0;
  }
`;

const MenuTitleAccordionButton = styled.button<{ isOpen: boolean, isTitleLong: boolean }>`
  display: ${props => props.isTitleLong ? 'inherit' : 'none'};
  height: 45.4px;
  width: 21.75px;
  border: none;
  background-color: transparent;
  background-image: url(${props => props.isOpen ? '"/img/up-arrow-orange.svg"' : '"/img/down-arrow-orange.svg"'});
  background-repeat: no-repeat;
  background-position-y: center;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuSubTitle = styled.div`
  font-size: 16px;
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
  margin: auto;
`;

const MobilePhotoReviewHeader = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MobilePhotoReviewTitle = styled.div`
  display: none;
  color: black;
  font-size: 14px;
  font-weight: 400;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const PhotoReviewButton = styled.div`
  width: max-content;
  display: flex;
`;

const PhotoReviewButtonText = styled.div`
  color: #919191;
  margin-right: 12px;
  font-size: 14px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileReviewHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ReviewTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 400;
  }
`;

const ReviewTotalCount = styled.div`
  margin-left: 7px;
  padding-top: 2px;
  font-weight: 800;
  color: #ff9522;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MoreReviewsButtonImage = styled.img`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px 0 24px;
  align-items: center;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 16px;
  }
`;

const ReviewPostButton = styled.button<{ mobile: boolean }>`
  position: absolute;
  background: #ff9522;
  width: 200px;
  color: white;
  text-align: center;
  padding: 14px 25px;
  border: none;
  bottom: 17px;
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
          margin: auto;
          margin-bottom: 16px;
          border-radius: 50px;
          padding: 8px 25px;
          @media (max-width: 768px) {
            display: block;
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

const Padding = styled.div`
  flex-grow: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;