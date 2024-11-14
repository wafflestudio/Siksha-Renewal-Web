import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";

interface MobileReviewImageSwiperProps {
  menuId: number;
  images: string[];
  swiperImagesLimit: number;
  imageCount: number;
}

export default function MobileReviewImageSwiper({
  menuId,
  images,
  swiperImagesLimit,
  imageCount,
}: MobileReviewImageSwiperProps) {
  const OPTIONS: EmblaOptionsType = { loop: false, watchDrag: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  if (images.length > swiperImagesLimit) {
    images = images.slice(0, swiperImagesLimit);
  }

  useEffect(() => {
    if (emblaApi) {
      const viewportElement = emblaApi.rootNode();
      const containerElement = emblaApi.containerNode();
      const updateWidthComparison = () => {
        const viewportWidth = viewportElement.offsetWidth;
        const containerWidth = containerElement.scrollWidth;
        emblaApi.reInit({ watchDrag: viewportWidth + 8 < containerWidth });
      };

      const resizeObserver = new ResizeObserver(updateWidthComparison);
      resizeObserver.observe(viewportElement);
      updateWidthComparison();
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [emblaApi]);

  return (
    <Swiper>
      <SwiperViewport ref={emblaRef}>
        <SwiperContainer>
          {images.length > 0 ? (
            images.map((image, index) => (
              <ReviewImageContainer key={image}>
                {imageCount > swiperImagesLimit && index === swiperImagesLimit - 1 && (
                  <Link href={`/menu/${menuId}/photos`}>
                    <MoreImages>{imageCount - swiperImagesLimit}건 더보기</MoreImages>
                  </Link>
                )}
                <ReviewImage src={image} alt="리뷰 이미지" />
              </ReviewImageContainer>
            ))
          ) : (
            <NoReviewMessage>아직 등록된 리뷰가 없어요.</NoReviewMessage>
          )}
        </SwiperContainer>
      </SwiperViewport>
    </Swiper>
  );
}

const Swiper = styled.div`
  position: relative;
  display: none;
  height: var(--slide-height);
  overflow: scroll;
  text-align: center;
  width: 100%;
  padding: 17px 0 20px 0;

  --slide-height: 120px;
  --slide-width: 120px;
  --slide-spacing: 8px;

  @media (max-width: 768px) {
    display: inherit;
  }
`;

const SwiperViewport = styled.div`
  position: absolute;
  height: fit-content;
  width: 100%;
  overflow: hidden;
`;

const SwiperContainer = styled.div`
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
`;

const ReviewImageContainer = styled.div`
  height: var(--slide-height);
  flex: 0 0 var(--slide-width);
  padding-right: var(--slide-spacing);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const MoreImages = styled.button`
  position: absolute;
  height: var(--slide-height);
  width: var(--slide-width);
  background: #00000080;
  border: none;
  border-radius: 10px;
  box-shadow: none;
  font-weight: 700;
  font-size: 12px;
  color: white;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    background-image: url("/img/plus.svg");
    width: 10px;
    height: 10px;
    margin: 0 auto 7px auto;
  }
`;

const ReviewImage = styled.img`
  height: var(--slide-height);
  width: var(--slide-width);
  border-radius: 10px;
`;

const NoReviewMessage = styled.div`
  height: var(--slide-height);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  color: #797979;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
