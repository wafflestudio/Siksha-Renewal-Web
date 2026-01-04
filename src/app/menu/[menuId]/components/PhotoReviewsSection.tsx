import useIsMobile from "hooks/UseIsMobile";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function PhotoReviewsSection({
  menuId,
  images,
}: { menuId: number; images: string[]; }) {
  const isMobile = useIsMobile();

  const imagesCount = images.length;
  const MAX_NUMBER_OF_PREVIEW_IMAGES = isMobile ? 3 : 4;
  const IMAGE_SIZE = isMobile ? 120 : 160;

  if (images.length > MAX_NUMBER_OF_PREVIEW_IMAGES) {
    images = images.slice(0, MAX_NUMBER_OF_PREVIEW_IMAGES);
  }

  return (
    <Container>
      <Header>
        <HeaderTextWrapper>
          <HeaderText>사진 리뷰</HeaderText>
          <HeaderText>{!isMobile && imagesCount}</HeaderText>
        </HeaderTextWrapper>
        <Link
          href={`/menu/${menuId}/photos`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            cursor: "pointer",
          }}
        >
          <Label>전체 보기</Label>
          <Image
            src="/img/right-arrow-darkgrey.svg"
            alt="전체 보기"
            width={18}
            height={18}
          />
        </Link>
      </Header>
      <Photos>
        {images.length > 0 ? (
          images.map((image, index) => (
            <ImageWrapper key={image + index}>
              {isMobile && imagesCount > MAX_NUMBER_OF_PREVIEW_IMAGES && index === MAX_NUMBER_OF_PREVIEW_IMAGES - 1 && (
                <Link href={`/menu/${menuId}/photos`}>
                  <MoreImages>{imagesCount - MAX_NUMBER_OF_PREVIEW_IMAGES}건 더보기</MoreImages>
                </Link>
              )}
              <Image
                src={image}
                alt="리뷰 이미지"
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </ImageWrapper>
          ))
        ) : (
          <NoReviewMessage>아직 등록된 리뷰가 없어요.</NoReviewMessage>
        )}
      </Photos>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  @media (max-width: 768px){
    padding-top: 14px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeaderTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const HeaderText = styled.div`
  align-self: stretch;
  
  color: var(--Color-Foundation-gray-900, #262728);

  /* text-16/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);

    /* text-14/Bold */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-14, 14px);
    font-style: normal;
    font-weight: var(--Font-weight-bold, 700);
    line-height: 150%; /* 21px */
  }
`;

const Label = styled.div`
  color: var(--Color-Foundation-gray-600, #989AA0);

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */

  @media (max-width: 768px) {
    display: none;
  }
`;

const Photos = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 10px;
  align-self: stretch;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    overflow-y: hidden;
    padding: 0 16px;
  }
`;

const ImageWrapper = styled.div`
  height: var(--image-height);
  width: var(--image-width);
  border-radius: 10px;
  overflow: hidden;

  --image-height: 160px;
  --image-width: 160px;

  @media (max-width: 768px) {
    --image-height: 120px;
    --image-width: 120px;
  }
`;

const MoreImages = styled.button`
  position: absolute;
  height: var(--image-height);
  width: var(--image-width);
  background: rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 10px;
  box-shadow: none;

  color: var(--Color-Foundation-base-white, #FFF);
  text-align: center;

  /* text-12/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-12, 12px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 16.8px */
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    background-image: url("/img/plus.svg");
    width: 10px;
    height: 10px;
    margin: 0 auto 6px auto;
  }
`;

const NoReviewMessage = styled.div`
  height: 160px;
  width: 100%;

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;
  align-content: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */
`;