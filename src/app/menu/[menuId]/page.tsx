'use client'

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from 'next/navigation';
import ReviewPostModal from "components/MenuDetail/ReviewPostModal";
import MobileSubHeader from "components/general/MobileSubHeader";
import MobileNavigationBar_Legacy from "components/general/MobileNavigationBar_Legacy";
import { getMenu } from "utils/api/menus";
import { getReviews } from "utils/api/reviews";
import MenuSection from "components/MenuDetail/MenuSection";
import ReviewSection from "components/MenuDetail/ReviewSection";
import useModals from "hooks/UseModals";
import useAuth_Legacy from "hooks/UseAuth_Legacy";

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
  const params = useParams();
  const menuId = params?.menuId;
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

  const { authStatus, getAccessToken } = useAuth_Legacy();

  const fetchMenu = async () => {
    const accessToken = await getAccessToken().catch((error) => "");

    getMenu(Number(menuId), accessToken)
      .then((menuData) => {
        setMenu(menuData);
        setMobileSubHeaderTitle(menuData.name_kr);
      })
      .catch((e) => {
        console.error(e);
        router.push("/");
      });
  };

  const fetchReviews = async () => {
    getReviews(Number(menuId))
      .then((reviewsData) => {
        setReviews({
          result: reviewsData.result,
          total_count: reviewsData.totalCount,
        });
      })
      .catch((e) => {
        console.error(e);
        router.push("/");
      });
  };

  useEffect(() => {
    if (!menuId) {
      return;
    }
    setLoading(true);

    async function fetchData() {
      Promise.all([fetchMenu(), fetchReviews()])
        .then(() => {})
        .catch((e) => {})
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
    if (authStatus === "login") handleReviewPostModal(true);
    else openLoginModal();
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
                isReviewListPageOpen={isReviewListPageOpen}
              />
              <MobileHLine $isReviewListPageOpen={isReviewListPageOpen} />
              {isReviewPostModalOpen ? (
                <ReviewPostModal
                  isOpen={isReviewPostModalOpen}
                  menu={{
                    menuName: menu.name_kr,
                    menuId: menu.id,
                  }}
                  onSubmit={fetchReviews}
                  onClose={() => handleReviewPostModal(false)}
                />
              ) : (
                <ReviewSection
                  menu={menu}
                  reviews={reviews}
                  images={images}
                  isReviewListPageOpen={isReviewListPageOpen}
                  handleReviewPostButtonClick={handleReviewPostButtonClick}
                  handleReviewListPage={handleReviewListPage}
                />
              )}
            </Info>
          </Background>
          <MobileNavigationBar_Legacy />
        </>
      )}
    </>
  );
}

const Background = styled.div`
  background-color: white;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 100%;
    flex-direction: column;
  }
`;

const Info = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  height: max(809px, calc(100vh - 271px));
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
    height: max(724px, calc(100vh - 60px));
    width: 100%;
    margin: 0;
  }
`;

const MobileHLine = styled.div<{ $isReviewListPageOpen: boolean }>`
  display: none;
  background: #9191911a;
  padding: 5px 0;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    display: inherit;
  }
  ${(props) => props.$isReviewListPageOpen && `display:none;`}
`;
