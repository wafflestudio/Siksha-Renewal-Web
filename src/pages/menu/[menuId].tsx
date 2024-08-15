import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReviewPostModal from "components/MenuDetail/ReviewPostModal";
import MobileSubHeader from "components/MobileSubHeader";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import { getMenu } from "utils/api/menus";
import { getReviews } from "utils/api/reviews";
import MenuSection from "components/MenuDetail/MenuSection";
import ReviewSection from "components/MenuDetail/ReviewSection";
import useModals from "hooks/UseModals";
import UseAccessToken from "hooks/UseAccessToken";

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
  const { menuId } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewListType>({
    result: [],
    total_count: 0,
  });
  const [menu, setMenu] = useState<MenuType>();
  const [images, setImages] = useState<string[]>([]);
  const [isReviewPostModalOpen, setIsReviewPostModalOpen] = useState(false);

  const { openLoginModal } = useModals();

  const [mobileSubHeaderTitle, setMobileSubHeaderTitle] = useState<string>("");
  const [isReviewListPageOpen, setIsReviewListPageOpen] = useState<boolean>(false);

  const { getAccessToken } = UseAccessToken();

  useEffect(() => {
    if (!menuId) {
      return;
    }
    setLoading(true);

    async function fetchData() {
      const accessToken = await getAccessToken().catch((error) => "");

      Promise.all([getMenu(Number(menuId), accessToken), getReviews(Number(menuId))])
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
    }
    fetchData();
  }, [menuId, setLoading]);

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
    } else openLoginModal();
  };

  const handleReviewPostModal = (isOpen: boolean) => {
    if (!menu) {
      console.error("menu is not loaded");
      return;
    }
    setMobileSubHeaderTitle(isOpen ? "나의 평가 남기기" : menu.name_kr);
    setIsReviewPostModalOpen(isOpen);
  };

  const handleReviewListPage = (isOpen: boolean) => {
    if (!menu) {
      console.error("menu is not loaded");
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
      router.push("/");
    }
  };

  return (
    <>
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
          <MobileNavigationBar />
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
  background: #9191911a;
  padding: 5px 0;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;
