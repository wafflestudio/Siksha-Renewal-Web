import styled from "styled-components";
import MobileReviewImageSwiper from "./MobileReviewImageSwiper";
import Link from "next/link";
import { ReviewListType } from "pages/menu/[id]";
import ReviewItem from "./ReviewItem.";
import useIsMobile from "hooks/UseIsMobile";

interface ReviewSectionProps {
  reviews: ReviewListType,
  images: string[],
  isReviewListPageOpen: boolean,
  handleReviewPostButtonClick: () => void,
  handleReviewListPage: (isOpen: boolean) => void,
}
export default function ReviewSection({ reviews, images, isReviewListPageOpen, handleReviewPostButtonClick, handleReviewListPage }: ReviewSectionProps) {
  const isMobile = useIsMobile();

  const MOBILE_IMAGE_LIST_LIMIT = 5;

  console.log(isReviewListPageOpen);
  
  return (
    <>
      {(isMobile && isReviewListPageOpen) ? (
        <MobileReviewListPage>
          <ReviewList>
            {reviews.result.length > 0
              ? reviews.result.map((review) => <ReviewItem key={review.id} review={review} />)
              : <NoReviewMessage>아직 등록된 리뷰가 없어요.</NoReviewMessage>
            }
          </ReviewList>
        </MobileReviewListPage>
      ) : (
        <ReviewContainer>
          <ReviewHeader>
            <MobilePhotoReviewHeader>
              <Link href="#" style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                textDecoration: "none",
                cursor: "pointer"
              }}>
                <MobilePhotoReviewTitle>사진 리뷰 모아보기</MobilePhotoReviewTitle>
                <PhotoReviewButton>
                  <PhotoReviewButtonText>사진 리뷰 모아보기</PhotoReviewButtonText>
                  <img
                    src="/img/right-arrow-darkgrey.svg"
                    alt="사진 리뷰 모아보기"
                    width="7.5"
                  />
                </PhotoReviewButton>
              </Link>
            </MobilePhotoReviewHeader>
            <MobileReviewImageSwiper images={images} swiperImagesLimit={MOBILE_IMAGE_LIST_LIMIT} imageCount={images.length} />
            <div style={{
              width: "100%",
              display: "flex"
            }} onClick={() => handleReviewListPage(true)}>
              <MobileReviewHeader>
                <div style={{ display: "flex" }}>
                  <ReviewTitle>리뷰</ReviewTitle>
                  <ReviewTotalCount>{reviews.total_count}</ReviewTotalCount>
                </div>
                <MoreReviewsButtonImage
                  src="/img/right-arrow-darkgrey.svg"
                  alt="리뷰 더보기"
                  width="7.5"
                />
              </MobileReviewHeader>
            </div>
          </ReviewHeader>
          <ReviewList>
            {reviews.result.length > 0
              ? reviews.result.map((review) => <ReviewItem key={review.id} review={review} />)
              : <NoReviewMessage>아직 등록된 리뷰가 없어요.</NoReviewMessage>
            }
          </ReviewList>
          <DesktopReviewPostButton onClick={handleReviewPostButtonClick}>
            나의 평가 남기기
          </DesktopReviewPostButton>
        </ReviewContainer>
      )}
    </>
  );
}

const ReviewContainer = styled.section`
  position: relative;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 735px;
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
  @media (max-width: 768px) {
    cursor: pointer;
  }
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
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px;
  align-items: center;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 16px;
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

const DesktopReviewPostButton = styled.button`
  position: absolute;
  bottom: 17px;
  background: #ff9522;
  width: 200px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  padding: 14px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
  display: none;
  }
`;

const MobileReviewListPage = styled.div`
  display: none;
  position: absolute;
  background-color: white;
  min-height: calc(100vh - 60px);
  padding: 24px 16px;
  width: 100vw;
  box-sizing: border-box;
  @media (max-width: 768px) {
    display: inherit;
  }
`;