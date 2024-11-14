'use client'

import PhotoReviewItem from "./components/PhotoReviewItem";
import ReviewItem from "app/menu/[menuId]/components/ReviewItem";
import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";
import useIsMobile from "hooks/UseIsMobile";
import useModals from "hooks/UseModals";
import { useRouter } from 'next/navigation';
import { ReviewListType } from "app/menu/[menuId]/Menu";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getReviews } from "utils/api/reviews";

export default function PhotoReviews({ menuId }: { menuId: number }) {
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewListType>({
    result: [],
    total_count: 0,
  });

  const { openLoginModal } = useModals();
  const isMobile = useIsMobile();
  const mobileSubHeaderTitle = "사진 리뷰 모아보기";
  const { getAccessToken } = useAuth();

  useEffect(() => {
    if (!menuId) {
      return;
    }

    const fetchPhotoReviews = () => {
      getReviews(Number(menuId))
        .then(({ totalCount, result }) => {
          const photoReviews = result.filter((review) => review.etc);
          setReviews({
            result: photoReviews,
            total_count: photoReviews.length,
          });
        })
        .catch((e) => {
          console.error(e);
          router.push("/");
        });
    };

    fetchPhotoReviews();
  }, [menuId]);

  const handleReviewPostButtonClick = () => {
    getAccessToken()
      .then(() => router.push(`/menu/${menuId}?writeReview=true`))
      .catch(() => openLoginModal());
  };

  const handleMobileSubHeaderBack = () => router.push(`/menu/${menuId}`);

  return (
    <>
      <MobileSubHeader title={mobileSubHeaderTitle} handleBack={handleMobileSubHeaderBack} />
      <Container>
        <GalleryWrapper>
          <GalleryHeader>
            <GalleryTitle>사진 리뷰</GalleryTitle>
            <PhotoReviewsCount>{reviews.total_count}</PhotoReviewsCount>
          </GalleryHeader>
          {reviews.result.length > 0 ? (
            <Gallery>
              {reviews.result.map((review) =>
                isMobile ? (
                  <ReviewItem key={review.id} review={review} />
                ) : (
                  <PhotoReviewItem key={review.id} review={review} />
                ),
              )}
            </Gallery>
          ) : (
            <NoReviewMessage>아직 등록된 리뷰가 없어요.</NoReviewMessage>
          )}
          <ReviewPostButtonWrapper>
            <ReviewPostButton onClick={handleReviewPostButtonClick} mobile={true}>
              나의 평가 남기기
            </ReviewPostButton>
          </ReviewPostButtonWrapper>
        </GalleryWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  min-height: calc(100vh - 271px);
  @media (max-width: 768px) {
    height: 100%;
    overflow-y: scroll;
  }
`;

const GalleryWrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 862px;
  min-height: calc(100vh - 271px);
  padding: 32px 0;
  margin: auto;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
    height: 100%;
  }
`;

const GalleryHeader = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

const GalleryTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const PhotoReviewsCount = styled.div`
  margin-left: 4px;
  margin-top: 2px;
  color: #ff9522;
  font-size: 16px;
  font-weight: 800;
`;

const Gallery = styled.section`
  display: grid;
  width: 100%;
  padding-top: 31px;
  grid-template-columns: repeat(auto-fill, 192px);
  column-gap: 30px;
  row-gap: 38px;
  @media (max-width: 768px) {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
    overflow-x: auto;
  }
`;

const NoReviewMessage = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: 400;
  color: #797979;
  flex-grow: 1;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ReviewPostButtonWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  height: 46px;
  bottom: 17px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ReviewPostButton = styled.button<{ mobile: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #ff9522;
  width: 200px;

  padding: 14px 25px;
  border: none;
  border-radius: 5px;

  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  cursor: pointer;
`;
