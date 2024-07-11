import Stars from "components/MenuDetail/Stars";
import { useDispatchContext } from "hooks/ContextProvider";
import { useRouter } from "next/router";
import { ReviewListType, ReviewType } from "pages/menu/[id]";
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { getReviews } from "utils/api/reviews";

function PhotoReviewItem({ review }: { review: ReviewType }) {
  return (
    <>
      <ItemContainer>
        <Thumbnail src={review.etc.images[0]} />
        <ReviewInfo>
          <ReviewerIdText>ID {review.user_id}</ReviewerIdText>
          <ReviewDate>{review.created_at.substring(0, 10)}</ReviewDate>
        </ReviewInfo>
        <ReviewContent>{review.comment}</ReviewContent>
        <ReviewScore>
          <ThemeProvider theme={{ width: 73 }}>
            <Stars score={review.score || 0} />
          </ThemeProvider>
          <ReviewScoreValue>{review.score}</ReviewScoreValue>
        </ReviewScore>
      </ItemContainer>
    </>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 192px;
  row-gap: 11px;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  height: 192px;
  width: 192px;
  border-radius: 8px;
  width: 192px;
  height: 192px;
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewerIdText = styled.span`
  font-size: 12px;
  font-weight: 700px;
`;

const ReviewDate = styled.span`
  color: #919191;
  font-size: 10px;
  font-weight: 700;
`;

const ReviewContent = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400px;
`;

const ReviewScore = styled.div`
  height: 14px;
  display: flex;
`;

const ReviewScoreValue = styled.span`
  color: #ff9522;
  font-size: 12px;
  font-weight: 700;
  margin-left: 10px;
`;

export default function PhotoReviews() {
  const router = useRouter();
  const { id } = router.query;
  const [reviews, setReviews] = useState<ReviewListType>({
    result: [],
    total_count: 0,
  });

  const { setLoginModal } = useDispatchContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchReview = () => {
      getReviews(Number(id))
        .then(({ totalCount, result }) => {
          const photoReviews = result.filter((review) => review.etc)
          setReviews({
            result: photoReviews,
            total_count: photoReviews.length
          });
        })
        .catch((e) => {
          router.push("/");
        });
    };

    fetchReview();
  }, [id]);

  const handleReviewPostButtonClick = () => {
    if (!!localStorage.getItem("access_token")) {
      router.push(`/menu/${id}?writeReview=true`)
    } else {
      setLoginModal(true);
    }
  };

  return (
    <>
      <Container>
        <GalleryWrapper>
          <GalleryHeader>
            <GalleryTitle>사진 리뷰</GalleryTitle>
            <PhotoReviewsCount>{reviews.total_count}</PhotoReviewsCount>
          </GalleryHeader>
          <Gallery>
            {reviews.result.length > 0 ?
              reviews.result.map((review) => <PhotoReviewItem key={review.id} review={review} />)
              : "리뷰 없어용"}
          </Gallery>
          <ReviewPostButton onClick={handleReviewPostButtonClick} mobile={true}>
            나의 평가 남기기
          </ReviewPostButton>
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
`;

const GalleryWrapper = styled.main`
  width: 862px;
  height: 100%;
  margin: auto;
  padding: 32px 0;
  box-sizing: border-box;
  @media (max-width: 768px) {
      width: 100%;
      padding: 0 16px;
  }
`;

const GalleryHeader = styled.div`
  display: flex;
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
`;

const ReviewPostButton = styled.button<{ mobile: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 17px;
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
  @media (max-width: 768px) {
    display: none;
  }
`;