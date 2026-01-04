"use client";

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileSubHeader from "components/general/MobileSubHeader";
import MenuSection from "./components/MenuSection";
import ReviewSection from "./components/ReviewSection";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";
import MobileLayout from "styles/layouts/MobileLayout";
import useMenu from "hooks/UseMenu";

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
  const { menu, reviews, fetchReviews, fetchData } = useMenu();
  const { openLoginModal } = useModals();
  const { authStatus } = useAuth();

  const [images, setImages] = useState<string[]>([]);
  const [mobileSubHeaderTitle, setMobileSubHeaderTitle] = useState<string>("");
  const [isReviewListPageOpen, setIsReviewListPageOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData(menuId);
  }
    , [menuId]);

  useEffect(() => {
    if (menu) {
      setMobileSubHeaderTitle(menu.name_kr);
    }
  }, [menu]);

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
    if (authStatus !== "login") {
      openLoginModal();
    } else {
      router.push(`/menu/${menuId}/reviews/write`);
    }
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
    if (isReviewListPageOpen) {
      handleReviewListPage(false);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {!!menu && (
        <>
          <DesktopContainer>
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
          </DesktopContainer>
          <MobileContainer>
            <MobileSubHeader title={mobileSubHeaderTitle} handleBack={handleMobileSubHeaderBack} />
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