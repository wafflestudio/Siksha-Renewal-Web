import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginModal from "components/Auth/LoginModal";
import ReviewPostModal from "components/MenuDetail/ReviewPostModal";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import MobileSubHeader from "components/MobileSubHeader";
import { getMenu } from "utils/api/menus";
import { getReviews, getReviewScore } from "utils/api/reviews";
import { useSearchParams } from 'next/navigation'
import useIsMobile from "hooks/UseIsMobile";
import MenuSection from "components/MenuDetail/MenuSection";
import ReviewSection from "components/MenuDetail/ReviewSection";

export interface MenuType {
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
  const [isReviewPostModalOpen, setIsReviewPostModalOpen] = useState(false);

  const state = useStateContext();
  const { isLoginModal } = state;
  const { setLoginModal } = useDispatchContext();

  const isMobile = useIsMobile();
  const [mobileSubHeaderTitle, setMobileSubHeaderTitle] = useState<string>("");
  const [isReviewListPageOpen, setIsReviewListPageOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);

    Promise.all([
      getMenu(Number(id)),
      getReviews(Number(id)),
    ])
      .then(([menuData, reviewsData]) => {
        setMenu(menuData);
        setMobileSubHeaderTitle(menuData.name_kr);
        setReviews({
          result: reviewsData.result,
          total_count: reviewsData.totalCount,
        });
      })
      .catch((e) => {
        console.error(e);
        router.push("/");
      })
      .finally(() => setLoading(false));

  }, [id, setLoading]);

  useEffect(() => {
    var updatedImages: string[] = [];
    reviews.result.map((review) => {
      if (review.etc) {
        updatedImages = updatedImages.concat(review.etc.images);
      }
    });
    setImages(updatedImages);
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
    setMobileSubHeaderTitle(isOpen ? "나의 평가 남기기" : menu.name_kr);
    setIsReviewPostModalOpen(isOpen);
  };

  const handleReviewListPage = (isOpen: boolean) => {
    if (!menu) {
      console.error('menu is not loaded');
      return;
    }
    setMobileSubHeaderTitle(isOpen ? "리뷰" : menu.name_kr);
    setIsReviewListPageOpen(isOpen);
  };

  const handleMobileSubHeaderBack = () => {
    if (isReviewPostModalOpen) {
      handleReviewPostModal(false);
    } else if (isReviewListPageOpen) {
      handleReviewListPage(false);
    } else {
      router.push('/');
    }
  }

  return (
    <>
      {isLoginModal && <LoginModal />}
      {!isLoading && !!menu && (
        <>
          <MobileSubHeader title={mobileSubHeaderTitle} handleBack={handleMobileSubHeaderBack} />
          <Background>
            <Info>
              <MenuSection
                menu={menu}
                reviewsTotalCount={reviews.total_count}
                images={images}
                handleReviewPostButtonClick={handleReviewPostButtonClick}
              />
              <MobileHLine />
              {isReviewPostModalOpen ? (
                <ReviewPostModal
                  isOpen={isReviewPostModalOpen}
                  menu={{
                    menuName: menu.name_kr,
                    menuId: menu.id,
                  }}
                  onClose={() => handleReviewPostModal(false)}
                />
              ) : (
                <ReviewSection
                  menuId={menu.id}
                  reviews={reviews}
                  images={images}
                  isReviewListPageOpen={isReviewListPageOpen}
                  handleReviewPostButtonClick={handleReviewPostButtonClick}
                  handleReviewListPage={handleReviewListPage}
                />
              )}
            </Info>
          </Background>
        </>
      )}
    </>
  );
}

const Background = styled.div`
  background-color: white;
  overflow: scroll;
  display: flex;
  @media (max-width: 768px) {
    height: 100%;
    flex-direction: column;
  }
`;

const Info = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  height: max(809px, calc(100vh - 271px));
  width: fit-content;
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    height: max(724px, calc(100vh - 60px));
    width: 100%;
    margin: 0;
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
