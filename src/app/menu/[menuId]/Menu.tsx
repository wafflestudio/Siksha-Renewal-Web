"use client";

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewPostModal from "app/menu/[menuId]/components/ReviewPostModal";
import MobileSubHeader from "components/general/MobileSubHeader";
import { getMenu } from "utils/api/menus";
import { getReviews } from "utils/api/reviews";
import MenuSection from "./components/MenuSection";
import ReviewSection from "./components/ReviewSection";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useError from "hooks/useError";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";
import MobileLayout from "styles/layouts/MobileLayout";

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

export default function Menu({ menuId }: { menuId: number }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewListType>({
    result: [],
    total_count: 0,
  });
  const [menu, setMenu] = useState<MenuType>();
  const [images, setImages] = useState<string[]>([]);
  const [isReviewPostModalOpen, setIsReviewPostModalOpen] = useState(false);

  const { openLoginModal } = useModals();
  const { onHttpError } = useError();

  const [mobileSubHeaderTitle, setMobileSubHeaderTitle] = useState<string>("");
  const [isReviewListPageOpen, setIsReviewListPageOpen] = useState<boolean>(false);

  const { authStatus, getAccessToken } = useAuth();

  const fetchMenu = async () => {
    const accessToken = await getAccessToken().catch((error) => "");

    getMenu(Number(menuId), accessToken)
      .then((menuData) => {
        setMenu(menuData);
        setMobileSubHeaderTitle(menuData.name_kr);
      })
      .catch((e) => {
        onHttpError(e);
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
        onHttpError(e);
      });
  };

  useEffect(() => {
    if (!menuId) {
      return;
    }
    setLoading(true);

    async function fetchData() {
      Promise.all([fetchMenu(), fetchReviews()])
        .then(() => { })
        .catch((e) => { })
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
          <DesktopContainer>
            {isReviewPostModalOpen ? (
              <ReviewPostModal
                isOpen={isReviewPostModalOpen}
                menu={{
                  menuName: menu.name_kr,
                  menuId: menu.id
                }}
                onSubmit={fetchReviews}
                onClose={() => handleReviewPostModal(false)}
              />
            ) : (
              <>
                <LeftSide>
                  <MenuSection
                    menu={menu}
                    reviewsTotalCount={reviews.total_count}
                    images={images}
                    handleReviewPostButtonClick={handleReviewPostButtonClick}
                    isReviewListPageOpen={isReviewListPageOpen}
                  />
                </LeftSide>
                <RightSide>
                  <ReviewSection
                    reviews={reviews}
                    isReviewListPageOpen={isReviewListPageOpen}
                    handleReviewListPage={handleReviewListPage}
                  />
                </RightSide>
              </>
            )}
          </DesktopContainer>
          <MobileContainer>
            <MobileSubHeader title={mobileSubHeaderTitle} handleBack={handleMobileSubHeaderBack} />
            {isReviewPostModalOpen ? (
              <ReviewPostModal
                isOpen={isReviewPostModalOpen}
                menu={{
                  menuName: menu.name_kr,
                  menuId: menu.id
                }}
                onSubmit={fetchReviews}
                onClose={() => handleReviewPostModal(false)}
              />
            ) : (
              <>
                <MenuSection
                  menu={menu}
                  reviewsTotalCount={reviews.total_count}
                  images={images}
                  handleReviewPostButtonClick={handleReviewPostButtonClick}
                  isReviewListPageOpen={isReviewListPageOpen}
                />
                <ReviewSection
                  reviews={reviews}
                  isReviewListPageOpen={isReviewListPageOpen}
                  handleReviewListPage={handleReviewListPage}
                />
              </>
            )}
            <MobileNavigationBar />
          </MobileContainer>
        </>
      )}
    </>
  );
}

const DesktopContainer = styled(TwoColumnLayout.Container)`
  margin-top: 22px;
`;

const LeftSide = styled(TwoColumnLayout.Left)``;

const RightSide = styled(TwoColumnLayout.Right)``;

const MobileContainer = styled(MobileLayout.Container)``;